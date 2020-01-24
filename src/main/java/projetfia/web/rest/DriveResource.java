package projetfia.web.rest;

import com.google.api.services.drive.model.FileList;

import io.undertow.server.handlers.form.FormData;
import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;
import projetfia.domain.Drive;
import projetfia.domain.DriveFile;
import projetfia.repository.DriveRepository;
import projetfia.service.DriveService;
import projetfia.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.nio.file.Files;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link projetfia.domain.Drive}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DriveResource {

    private final Logger log = LoggerFactory.getLogger(DriveResource.class);

    private final DriveRepository driveRepository;

    public DriveResource(DriveRepository driveRepository) {
        this.driveRepository = driveRepository;
    }

    /**
     * {@code GET  /drives} : get all the drives.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of drives in body.
     */
    /*
    @GetMapping("/drives")
    public List<Drive> getAllDrives() {
        log.debug("REST request to get all Drives");
        return driveRepository.findAll();
    }
*/
    /**
     * {@code GET  /drives/:id} : get the "id" drive.
     *
     * @param id the id of the drive to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the drive, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/drives/{id}")
    public ResponseEntity<Drive> getDrive(@PathVariable Long id) {
        log.debug("REST request to get Drive : {}", id);
        Optional<Drive> drive = driveRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(drive);
    }

    @PostMapping("/drives")
    public void uploadFile(@RequestParam("file") MultipartFile multiPartFile, @RequestParam("role") String role) throws GeneralSecurityException, IOException {
        log.debug("REST request to upload a file");
        DriveService driveService = new DriveService();
        File file = new File(multiPartFile.getOriginalFilename());
        FileUtils.writeByteArrayToFile(file, multiPartFile.getBytes());
        driveService.uploadFile(file,role);
        file.delete();
    }
}
