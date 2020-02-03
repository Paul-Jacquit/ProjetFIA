package projetfia.web.rest;

import projetfia.domain.Information;
import projetfia.repository.InformationRepository;
import projetfia.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link projetfia.domain.Information}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InformationResource {

    private final Logger log = LoggerFactory.getLogger(InformationResource.class);

    private static final String ENTITY_NAME = "information";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InformationRepository informationRepository;

    public InformationResource(InformationRepository informationRepository) {
        this.informationRepository = informationRepository;
    }

    /**
     * {@code POST  /information} : Create a new information.
     *
     * @param information the information to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new information, or with status {@code 400 (Bad Request)} if the information has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/information")
    public ResponseEntity<Information> createInformation(@RequestBody Information information) throws URISyntaxException {
        log.debug("REST request to save Information : {}", information);
        if (information.getId() != null) {
            throw new BadRequestAlertException("A new information cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Information result = informationRepository.save(information);
        return ResponseEntity.created(new URI("/api/information/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /information} : Updates an existing information.
     *
     * @param information the information to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated information,
     * or with status {@code 400 (Bad Request)} if the information is not valid,
     * or with status {@code 500 (Internal Server Error)} if the information couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/information")
    public ResponseEntity<Information> updateInformation(@RequestBody Information information) throws URISyntaxException {
        log.debug("REST request to update Information : {}", information);
        if (information.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Information result = informationRepository.save(information);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, information.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /information} : get all the information.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of information in body.
     */
    @GetMapping("/information")
    public List<Information> getAllInformation() {
        log.debug("REST request to get all Information");
        return informationRepository.findAll();
    }

    /**
     * {@code GET  /information/:id} : get the "id" information.
     *
     * @param id the id of the information to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the information, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/information/{id}")
    public ResponseEntity<Information> getInformation(@PathVariable Long id) {
        log.debug("REST request to get Information : {}", id);
        Optional<Information> information = informationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(information);
    }

    /**
     * {@code DELETE  /information/:id} : delete the "id" information.
     *
     * @param id the id of the information to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/information/{id}")
    public ResponseEntity<Void> deleteInformation(@PathVariable Long id) {
        log.debug("REST request to delete Information : {}", id);
        informationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
