package projetfia.web.rest;

import com.google.api.services.drive.model.FileList;

import io.undertow.server.handlers.form.FormData;
import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;
import projetfia.domain.DriveFile;
import projetfia.service.DriveService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;


/**
 * REST controller for managing {@link projetfia.service.DriveService}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DriveResource {

    private final Logger log = LoggerFactory.getLogger(DriveResource.class);


    public DriveResource( ) {
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
