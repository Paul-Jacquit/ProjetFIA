package projetfia.repository;

import projetfia.domain.Information;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Information entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InformationRepository extends JpaRepository<Information, Long>, JpaSpecificationExecutor<Information> {

}
