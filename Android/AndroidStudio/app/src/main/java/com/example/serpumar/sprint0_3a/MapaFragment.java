package com.example.serpumar.sprint0_3a;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


public class MapaFragment extends Fragment {

    private static String ETIQUETA_LOG = ">>>>";
    private ReceptorBluetooth receptorBluetooth = new ReceptorBluetooth();

    private GPS gps = new GPS();
    private LogicaFake lf = new LogicaFake();

    public MapaFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_map, container, false);

        /*receptorBluetooth.setContext(this.getActivity());
        if(receptorBluetooth.getUltimaMedicion()==null) {
            receptorBluetooth.buscarEsteDispositivoBTLEYObtenerMedicion(Utilidades.stringToUUID( "GRUP3-GTI-PROY-3" ));
        }*/
    }

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    public void botonBuscarDispositivosBTLEPulsado( View v ) {
        Log.d(ETIQUETA_LOG, " boton buscar dispositivos BTLE Pulsado" );
        //receptorBluetooth.buscarTodosLosDispositivosBTLE();
        receptorBluetooth.activarAvisador(0,0);

    } // ()

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    public void botonBuscarNuestroDispositivoBTLEPulsado( View v ) {
        Log.d(ETIQUETA_LOG, "-- boton nuestro dispositivo BTLE Pulsado" );
        receptorBluetooth.buscarEsteDispositivoBTLE( Utilidades.stringToUUID( "GRUP3-GTI-PROY-3" ));

    } // ()

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    public void botonDetenerBusquedaDispositivosBTLEPulsado( View v ) {
        Log.d(ETIQUETA_LOG, " boton nuestro dispositivo BTLE Detenido" );
        receptorBluetooth.detenerBusquedaDispositivosBTLE();
    } // ()


    // --------------------------------------------------------------
    // --------------------------------------------------------------
    public void botonObtenerMedicionDeBDD( View v ) {
        Log.d(ETIQUETA_LOG, " boton obtener medicion bdd" );
        lf.obtenerMedicion(this.getContext());

    } // ()
}