package net.savantly.coach.repository;

import net.savantly.coach.domain.FieldServiceRequest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FieldServiceRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldServiceRequestRepository extends JpaRepository<FieldServiceRequest, Long> {

}
