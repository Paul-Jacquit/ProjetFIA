package projetfia.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import projetfia.domain.Information;
import projetfia.domain.*; // for static metamodels
import projetfia.repository.InformationRepository;
import projetfia.service.dto.InformationCriteria;

/**
 * Service for executing complex queries for {@link Information} entities in the database.
 * The main input is a {@link InformationCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Information} or a {@link Page} of {@link Information} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InformationQueryService extends QueryService<Information> {

    private final Logger log = LoggerFactory.getLogger(InformationQueryService.class);

    private final InformationRepository informationRepository;

    public InformationQueryService(InformationRepository informationRepository) {
        this.informationRepository = informationRepository;
    }

    /**
     * Return a {@link List} of {@link Information} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Information> findByCriteria(InformationCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Information> specification = createSpecification(criteria);
        return informationRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Information} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Information> findByCriteria(InformationCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Information> specification = createSpecification(criteria);
        return informationRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InformationCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Information> specification = createSpecification(criteria);
        return informationRepository.count(specification);
    }

    /**
     * Function to convert {@link InformationCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Information> createSpecification(InformationCriteria criteria) {
        Specification<Information> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Information_.id));
            }
            if (criteria.getTitre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTitre(), Information_.titre));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), Information_.description));
            }
            if (criteria.getChannel() != null) {
                specification = specification.and(buildStringSpecification(criteria.getChannel(), Information_.channel));
            }
        }
        return specification;
    }
}
