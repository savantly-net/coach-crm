package net.savantly.coach.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ContactEmail.
 */
@Entity
@Table(name = "contact_email")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "contactemail")
public class ContactEmail extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address")
    private String address;

    @Column(name = "confirmed")
    private Boolean confirmed;

    @Column(name = "jhi_primary")
    private Boolean primary;

    @ManyToOne
    @JsonIgnoreProperties("emailAddresses")
    private Contact contact;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public ContactEmail address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean isConfirmed() {
        return confirmed;
    }

    public ContactEmail confirmed(Boolean confirmed) {
        this.confirmed = confirmed;
        return this;
    }

    public void setConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }

    public Boolean isPrimary() {
        return primary;
    }

    public ContactEmail primary(Boolean primary) {
        this.primary = primary;
        return this;
    }

    public void setPrimary(Boolean primary) {
        this.primary = primary;
    }

    public Contact getContact() {
        return contact;
    }

    public ContactEmail contact(Contact contact) {
        this.contact = contact;
        return this;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ContactEmail contactEmail = (ContactEmail) o;
        if (contactEmail.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactEmail.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactEmail{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", confirmed='" + isConfirmed() + "'" +
            ", primary='" + isPrimary() + "'" +
            "}";
    }
}
