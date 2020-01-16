package projetfia.domain;


import com.google.api.services.drive.model.File;

public class DriveFile {

    String id;
    String parentId;
    String name;
    String mimeType;
    File file;
    java.io.File filePath;

    public DriveFile(String name, String mimeType, String filePath) {
        this.name = name;
        this.mimeType = mimeType;
        this.filePath = new java.io.File(filePath);
    }
    public DriveFile(String id, String name, String mimeType, String filePath) {
        this.id = id;
        this.name = name;
        this.mimeType = mimeType;
        this.filePath = new java.io.File(filePath);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public File getFile() {
        return file;
    }

    public void setFile(String filePath) {
        File file = new File();
        this.file = file;
    }

    public java.io.File getFilePath() {
        return filePath;
    }

    public void setFilePath(java.io.File filePath) {
        this.filePath = filePath;
    }

}
