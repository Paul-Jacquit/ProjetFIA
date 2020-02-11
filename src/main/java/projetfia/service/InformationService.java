package projetfia.service;

import projetfia.domain.Information;
import projetfia.repository.InformationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Information}.
 */
@Service
@Transactional
public class InformationService {

    private final Logger log = LoggerFactory.getLogger(InformationService.class);

    private final InformationRepository informationRepository;

    public InformationService(InformationRepository informationRepository) {
        this.informationRepository = informationRepository;
    }

    /**
     * Save a information.
     *
     * @param information the entity to save.
     * @return the persisted entity.
     */
    public Information save(Information information) {
        log.debug("Request to save Information : {}", information);
        return informationRepository.save(information);
    }

    /**
     * Get all the information.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Information> findAll() {
        log.debug("Request to get all Information");
        return informationRepository.findAll();
    }


    /**
     * Get one information by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Information> findOne(Long id) {
        log.debug("Request to get Information : {}", id);
        return informationRepository.findById(id);
    }

    /**
     * Delete the information by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Information : {}", id);
        informationRepository.deleteById(id);
    }
}
