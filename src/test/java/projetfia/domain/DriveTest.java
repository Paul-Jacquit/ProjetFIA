package projetfia.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import projetfia.web.rest.TestUtil;

public class DriveTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Drive.class);
        Drive drive1 = new Drive();
        drive1.setId(1L);
        Drive drive2 = new Drive();
        drive2.setId(drive1.getId());
        assertThat(drive1).isEqualTo(drive2);
        drive2.setId(2L);
        assertThat(drive1).isNotEqualTo(drive2);
        drive1.setId(null);
        assertThat(drive1).isNotEqualTo(drive2);
    }
}
