package net.savantly.coach.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import net.savantly.coach.domain.enumeration.ContactStatus;

/**
 * A Contact.
 */
@Entity
@Table(name = "contact")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "contact")
public class Contact extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "dob")
    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ContactStatus status;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "job_role")
    private String jobRole;

    @Column(name = "position")
    private String position;

    @Column(name = "linked_in")
    private String linkedIn;

    @Column(name = "fax")
    private String fax;

    @Column(name = "department")
    private String department;

    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

    @OneToMany(mappedBy = "contact")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactPhone> phoneNumbers = new HashSet<>();
    @OneToMany(mappedBy = "contact")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactEmail> emailAddresses = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Contact firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Contact lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDob() {
        return dob;
    }

    public Contact dob(LocalDate dob) {
        this.dob = dob;
        return this;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public ContactStatus getStatus() {
        return status;
    }

    public Contact status(ContactStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ContactStatus status) {
        this.status = status;
    }

    public String getCompanyName() {
        return companyName;
    }

    public Contact companyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobRole() {
        return jobRole;
    }

    public Contact jobRole(String jobRole) {
        this.jobRole = jobRole;
        return this;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public String getPosition() {
        return position;
    }

    public Contact position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getLinkedIn() {
        return linkedIn;
    }

    public Contact linkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
        return this;
    }

    public void setLinkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
    }

    public String getFax() {
        return fax;
    }

    public Contact fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getDepartment() {
        return department;
    }

    public Contact department(String department) {
        this.department = department;
        return this;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Address getAddress() {
        return address;
    }

    public Contact address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Set<ContactPhone> getPhoneNumbers() {
        return phoneNumbers;
    }

    public Contact phoneNumbers(Set<ContactPhone> contactPhones) {
        this.phoneNumbers = contactPhones;
        return this;
    }

    public Contact addPhoneNumbers(ContactPhone contactPhone) {
        this.phoneNumbers.add(contactPhone);
        contactPhone.setContact(this);
        return this;
    }

    public Contact removePhoneNumbers(ContactPhone contactPhone) {
        this.phoneNumbers.remove(contactPhone);
        contactPhone.setContact(null);
        return this;
    }

    public void setPhoneNumbers(Set<ContactPhone> contactPhones) {
        this.phoneNumbers = contactPhones;
    }

    public Set<ContactEmail> getEmailAddresses() {
        return emailAddresses;
    }

    public Contact emailAddresses(Set<ContactEmail> contactEmails) {
        this.emailAddresses = contactEmails;
        return this;
    }

    public Contact addEmailAddresses(ContactEmail contactEmail) {
        this.emailAddresses.add(contactEmail);
        contactEmail.setContact(this);
        return this;
    }

    public Contact removeEmailAddresses(ContactEmail contactEmail) {
        this.emailAddresses.remove(contactEmail);
        contactEmail.setContact(null);
        return this;
    }

    public void setEmailAddresses(Set<ContactEmail> contactEmails) {
        this.emailAddresses = contactEmails;
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
        Contact contact = (Contact) o;
        if (contact.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contact.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Contact{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", dob='" + getDob() + "'" +
            ", status='" + getStatus() + "'" +
            ", companyName='" + getCompanyName() + "'" +
            ", jobRole='" + getJobRole() + "'" +
            ", position='" + getPosition() + "'" +
            ", linkedIn='" + getLinkedIn() + "'" +
            ", fax='" + getFax() + "'" +
            ", department='" + getDepartment() + "'" +
            "}";
    }
}
