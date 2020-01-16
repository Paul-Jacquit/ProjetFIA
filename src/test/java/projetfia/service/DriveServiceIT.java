package projetfia.service;


import com.google.api.services.drive.model.File;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import projetfia.ProjetFiaApp;
import projetfia.domain.DriveFile;

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
            System.out.println(files.get(i).getName()+" "+files.get(i).getId()+" "+files.get(i).getMimeType());
        }
        assertThat(files).size().isNotEqualTo(0);
    }

    @Test
    public void testExportFile() throws IOException {
        File file = driveService.getFileById("1_zXXIHbRxRvoSl4OOFSEpj-hjl3BNWAcq-jSUNX4Uzg");
        DriveFile driveFile = new DriveFile(file.getId(), file.getName(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "./");
        System.out.println("name = "+file.getName());
        driveService.downLoadFile(driveFile);
    }

    @Test
    public void testUploadFile() throws IOException {
        DriveFile driveFile = new DriveFile("testUpload","image/jpeg","./Université_Bordeaux_(Logo_2013).jpg");
        driveService.uploadFile(driveFile);
    }

}
