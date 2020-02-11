package projetfia.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link projetfia.domain.Information} entity. This class is used
 * in {@link projetfia.web.rest.InformationResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /information?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class InformationCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter titre;

    private StringFilter description;

    private StringFilter channel;

    public InformationCriteria(){
    }

    public InformationCriteria(InformationCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.titre = other.titre == null ? null : other.titre.copy();
        this.description = other.description == null ? null : other.description.copy();
        this.channel = other.channel == null ? null : other.channel.copy();
    }

    @Override
    public InformationCriteria copy() {
        return new InformationCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getTitre() {
        return titre;
    }

    public void setTitre(StringFilter titre) {
        this.titre = titre;
    }

    public StringFilter getDescription() {
        return description;
    }

    public void setDescription(StringFilter description) {
        this.description = description;
    }

    public StringFilter getChannel() {
        return channel;
    }

    public void setChannel(StringFilter channel) {
        this.channel = channel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final InformationCriteria that = (InformationCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(titre, that.titre) &&
            Objects.equals(description, that.description)&&
                Objects.equals(channel, that.channel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        titre,
        description,channel
        );
    }

    @Override
    public String toString() {
        return "InformationCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (titre != null ? "titre=" + titre + ", " : "") +
                (description != null ? "description=" + description + ", " : "") +
            "}";
    }

}
