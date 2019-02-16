package net.savantly.coach.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A FieldServiceType.
 */
@Entity
@Table(name = "field_service_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "fieldservicetype")
public class FieldServiceType extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "fieldServiceType")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FieldServiceRequest> requestTypes = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public FieldServiceType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public FieldServiceType description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<FieldServiceRequest> getRequestTypes() {
        return requestTypes;
    }

    public FieldServiceType requestTypes(Set<FieldServiceRequest> fieldServiceRequests) {
        this.requestTypes = fieldServiceRequests;
        return this;
    }

    public FieldServiceType addRequestType(FieldServiceRequest fieldServiceRequest) {
        this.requestTypes.add(fieldServiceRequest);
        fieldServiceRequest.setFieldServiceType(this);
        return this;
    }

    public FieldServiceType removeRequestType(FieldServiceRequest fieldServiceRequest) {
        this.requestTypes.remove(fieldServiceRequest);
        fieldServiceRequest.setFieldServiceType(null);
        return this;
    }

    public void setRequestTypes(Set<FieldServiceRequest> fieldServiceRequests) {
        this.requestTypes = fieldServiceRequests;
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
        FieldServiceType fieldServiceType = (FieldServiceType) o;
        if (fieldServiceType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fieldServiceType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FieldServiceType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
