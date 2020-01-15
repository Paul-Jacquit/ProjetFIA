package projetfia.service;


import com.google.api.services.drive.model.File;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import projetfia.ProjetFiaApp;

import javax.mail.internet.MimeMessage;

import java.io.IOException;
import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@SpringBootTest(classes = ProjetFiaApp.class)
public class DriveServiceIT {

    @Autowired
    private DriveService driveService;


    @Test
    public void testListFile() throws Exception {
        ArrayList<File> files;
        files=(ArrayList<File>) driveService.listFiles();
        for(int i=0;i<files.size();i++){
            System.out.println(files.get(i).getName()+" "+files.get(i).getId());
        }
        assertThat(files).size().isNotEqualTo(0);
    }

    @Test
    public void testExportFile() throws IOException {
       driveService.downLoadFile("1_zXXIHbRxRvoSl4OOFSEpj-hjl3BNWAcq-jSUNX4Uzg");
    }

    @Test
    public void testUploadFile() throws IOException {
        driveService.uploadFile();
    }

}
