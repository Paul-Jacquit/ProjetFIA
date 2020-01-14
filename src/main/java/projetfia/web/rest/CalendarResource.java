package projetfia.web.rest;

import projetfia.domain.Calendar;
import projetfia.repository.CalendarRepository;
import projetfia.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link projetfia.domain.Calendar}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CalendarResource {

    private final Logger log = LoggerFactory.getLogger(CalendarResource.class);

    private final CalendarRepository calendarRepository;

    public CalendarResource(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    /**
     * {@code GET  /calendars} : get all the calendars.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of calendars in body.
     */
    @GetMapping("/calendars")
    public List<Calendar> getAllCalendars() {
        log.debug("REST request to get all Calendars");
        return calendarRepository.findAll();
    }

    /**
     * {@code GET  /calendars/:id} : get the "id" calendar.
     *
     * @param id the id of the calendar to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the calendar, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/calendars/{id}")
    public ResponseEntity<Calendar> getCalendar(@PathVariable Long id) {
        log.debug("REST request to get Calendar : {}", id);
        Optional<Calendar> calendar = calendarRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(calendar);
    }
}
