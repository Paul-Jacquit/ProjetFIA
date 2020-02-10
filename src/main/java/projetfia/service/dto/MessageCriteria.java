package projetfia.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.*;

/**
 * Criteria class for the {@link projetfia.domain.Message} entity. This class is used
 * in {@link projetfia.web.rest.MessageResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /messages?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class MessageCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter text;

    private StringFilter user;

    private InstantFilter date;

    private StringFilter channel;

    public MessageCriteria(){
    }

    public MessageCriteria(MessageCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.text = other.text == null ? null : other.text.copy();
        this.user = other.user == null ? null : other.user.copy();
        this.date = other.date == null ? null : other.date.copy();
        this.channel = other.channel == null ? null : other.channel.copy();
    }

    @Override
    public MessageCriteria copy() {
        return new MessageCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getText() {
        return text;
    }

    public void setText(StringFilter text) {
        this.text = text;
    }

    public StringFilter getUser() {
        return user;
    }

    public void setUser(StringFilter user) {
        this.user = user;
    }

    public InstantFilter getDate() {
        return date;
    }

    public void setDate(InstantFilter date) {
        this.date = date;
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
        final MessageCriteria that = (MessageCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(text, that.text) &&
            Objects.equals(user, that.user) &&
                Objects.equals(channel,that.channel) &&
            Objects.equals(date, that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        text,
        user,
        date,channel
        );
    }

    @Override
    public String toString() {
        return "MessageCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (text != null ? "text=" + text + ", " : "") +
                (user != null ? "user=" + user + ", " : "") +
                (date != null ? "date=" + date + ", " : "") +
            "}";
    }

}
