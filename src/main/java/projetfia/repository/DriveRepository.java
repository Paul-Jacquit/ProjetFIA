package projetfia.repository;

import projetfia.domain.Drive;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Drive entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DriveRepository extends JpaRepository<Drive, Long> {

}
