package com.example.serpumar.sprint0_3a.ClasesPojo;

public class RecompensasPojo {

    private String recompensa;
    private String info;
    private int imageId;
    private int code;

    public RecompensasPojo(String recompensa, String info, int imageId, int code) {
        this.recompensa = recompensa;
        this.info = info;
        this.imageId = imageId;
        this.code = code;
    }

    public String getRecompensa() {
        return recompensa;
    }

    public void setRecompensa(String nombre) {
        this.recompensa = nombre;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }




}
