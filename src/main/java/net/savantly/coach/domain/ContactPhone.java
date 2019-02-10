package net.savantly.coach.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ContactPhone.
 */
@Entity
@Table(name = "contact_phone")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "contactphone")
public class ContactPhone extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_number")
    private String number;

    @Column(name = "sms")
    private Boolean sms;

    @ManyToOne
    @JsonIgnoreProperties("phoneNumbers")
    private Contact contact;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public ContactPhone number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Boolean isSms() {
        return sms;
    }

    public ContactPhone sms(Boolean sms) {
        this.sms = sms;
        return this;
    }

    public void setSms(Boolean sms) {
        this.sms = sms;
    }

    public Contact getContact() {
        return contact;
    }

    public ContactPhone contact(Contact contact) {
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
        ContactPhone contactPhone = (ContactPhone) o;
        if (contactPhone.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactPhone.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactPhone{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            ", sms='" + isSms() + "'" +
            "}";
    }
}
