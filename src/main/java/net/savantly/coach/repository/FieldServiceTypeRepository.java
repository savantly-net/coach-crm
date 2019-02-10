package net.savantly.coach.repository;

import net.savantly.coach.domain.FieldServiceType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FieldServiceType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldServiceTypeRepository extends JpaRepository<FieldServiceType, Long> {

}
