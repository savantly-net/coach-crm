package net.savantly.coach.repository;

import net.savantly.coach.domain.Upload;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Upload entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UploadRepository extends JpaRepository<Upload, Long> {

}
