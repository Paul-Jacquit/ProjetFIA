package projetfia.service;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import org.apache.tika.mime.MimeType;
import org.apache.tika.mime.MimeTypeException;
import org.apache.tika.mime.MimeTypes;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import projetfia.domain.DriveFile;

import javax.validation.constraints.Null;
import java.io.*;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class DriveService {

    private static final String APPLICATION_NAME = "Google Drive API Java Quickstart";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private Drive driveService;

    /**
     * Global instance of the scopes required by this quickstart.Drive service
     * If modifying these scopes, delete your previously saved tokens/ folder.
     */
    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

    public DriveService() throws GeneralSecurityException, IOException {

        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        driveService = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
            .setApplicationName(APPLICATION_NAME)
            .build();
    }

    /**
     * Creates an authorized Credential object.
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */
    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        // Load client secrets.
        InputStream in = DriveService.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
            HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
            .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
            .setAccessType("offline")
            .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    /*******/

    public List<File> listFiles() throws IOException {
        FileList result = driveService.files().list()
            .setPageSize(10)
            .setFields("nextPageToken, files(id, name, mimeType)")
            .execute();
        List<File> files = result.getFiles();
        return files;
    }

    public void uploadFile(DriveFile driveFile) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(driveFile.getName());
        //List<String> testListOfFiles = new ArrayList<>();
        //testListOfFiles.add(;
        if (driveFile.getParentId() != null)
            fileMetadata.setParents(Collections.singletonList(driveFile.getParentId()));
        FileContent mediaContent = new FileContent(driveFile.getMimeType(), driveFile.getFilePath());
        File file = driveService.files().create(fileMetadata, mediaContent)
            .setFields("id, parents")
            .execute();
        driveFile.setId(file.getId());
        System.out.println("File ID: " + file.getId());
    }

    public void downLoadFile(DriveFile driveFile) throws IOException, MimeTypeException {
        driveFile = addExtensionToName(driveFile);
        if(hasDoubleExtension(driveFile.getName())){
            driveFile.setName(deleteDoubleExtension(driveFile.getName()));
        }
        OutputStream out = new FileOutputStream(driveFile.getName());
        driveService.files().get(driveFile.getId())
            .executeMediaAndDownloadTo(out);
    }

    public File getFileById(String id) throws IOException {
        List<File> fileList = listFiles();
        for(int i=0;i<fileList.size();i++){
            if(id.equals(fileList.get(i).getId()))
                return fileList.get(i);
        }
        return null;
    }

    private DriveFile addExtensionToName(DriveFile driveFile) throws MimeTypeException {
        MimeTypes allTypes = MimeTypes.getDefaultMimeTypes();
        MimeType mimeType = allTypes.forName(driveFile.getMimeType());
        String extension = mimeType.getExtension();
        String newFileName = driveFile.getName()+extension;
        driveFile.setName(newFileName);
        return driveFile;
    }

    public boolean hasDoubleExtension(String fileName) {
        if(StringUtils.countOccurrencesOf(fileName, ".")<2)
            return false;
        else {
            String[] splittedFileName  = fileName.split("\\.");
            String whatIsAfterLastExtension = splittedFileName[splittedFileName.length-1];
            String whatIsAfterSecondToLastExtension = splittedFileName[splittedFileName.length-2];
            if(whatIsAfterLastExtension.equals(whatIsAfterSecondToLastExtension))
                return true;
        }
        return false;
    }

    public String deleteDoubleExtension(String fileName){
        fileName = fileName.substring(0,fileName.lastIndexOf("."));
        return fileName;
    }
}
