package net.savantly.coach.repository;

import net.savantly.coach.domain.ContactEmail;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ContactEmail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactEmailRepository extends JpaRepository<ContactEmail, Long> {

}
