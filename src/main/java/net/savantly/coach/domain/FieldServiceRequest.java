package net.savantly.coach.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import net.savantly.coach.domain.enumeration.FieldServiceStatus;

/**
 * A FieldServiceRequest.
 */
@Entity
@Table(name = "field_service_request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "fieldservicerequest")
public class FieldServiceRequest extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private FieldServiceStatus status;

    @Column(name = "contract_date")
    private LocalDate contractDate;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "finish_date")
    private LocalDate finishDate;

    @Column(name = "description")
    private String description;

    @Column(name = "total")
    private Double total;

    @OneToOne
    @JoinColumn(unique = true)
    private Contact requestor;

    @OneToMany(mappedBy = "fieldServiceRequest")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Upload> documents = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("fieldServiceRequests")
    private FieldServiceType fieldServiceType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FieldServiceStatus getStatus() {
        return status;
    }

    public FieldServiceRequest status(FieldServiceStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(FieldServiceStatus status) {
        this.status = status;
    }

    public LocalDate getContractDate() {
        return contractDate;
    }

    public FieldServiceRequest contractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
        return this;
    }

    public void setContractDate(LocalDate contractDate) {
        this.contractDate = contractDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public FieldServiceRequest startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getFinishDate() {
        return finishDate;
    }

    public FieldServiceRequest finishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }

    public String getDescription() {
        return description;
    }

    public FieldServiceRequest description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getTotal() {
        return total;
    }

    public FieldServiceRequest total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Contact getRequestor() {
        return requestor;
    }

    public FieldServiceRequest requestor(Contact contact) {
        this.requestor = contact;
        return this;
    }

    public void setRequestor(Contact contact) {
        this.requestor = contact;
    }

    public Set<Upload> getDocuments() {
        return documents;
    }

    public FieldServiceRequest documents(Set<Upload> uploads) {
        this.documents = uploads;
        return this;
    }

    public FieldServiceRequest addDocuments(Upload upload) {
        this.documents.add(upload);
        upload.setFieldServiceRequest(this);
        return this;
    }

    public FieldServiceRequest removeDocuments(Upload upload) {
        this.documents.remove(upload);
        upload.setFieldServiceRequest(null);
        return this;
    }

    public void setDocuments(Set<Upload> uploads) {
        this.documents = uploads;
    }

    public FieldServiceType getFieldServiceType() {
        return fieldServiceType;
    }

    public FieldServiceRequest fieldServiceType(FieldServiceType fieldServiceType) {
        this.fieldServiceType = fieldServiceType;
        return this;
    }

    public void setFieldServiceType(FieldServiceType fieldServiceType) {
        this.fieldServiceType = fieldServiceType;
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
        FieldServiceRequest fieldServiceRequest = (FieldServiceRequest) o;
        if (fieldServiceRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fieldServiceRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FieldServiceRequest{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", contractDate='" + getContractDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", total=" + getTotal() +
            "}";
    }
}
