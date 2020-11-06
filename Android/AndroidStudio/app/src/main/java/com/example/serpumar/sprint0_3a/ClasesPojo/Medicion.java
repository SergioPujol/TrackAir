package com.example.serpumar.sprint0_3a.ClasesPojo;

public class Medicion {


    private int medicion;
    private Ubicacion ubicacion;
    private String date;

    public Medicion(int medicion_, Ubicacion ubicacion_, String date_) {
        this.medicion = medicion_;
        this.ubicacion = ubicacion_;
        this.date = date_;
    }

    public int getMedicion() {
        return medicion;
    }

    public void setMedicion(int medicion) {
        this.medicion = medicion;
    }

    public Ubicacion getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


}
