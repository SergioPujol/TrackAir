package com.example.serpumar.sprint0_3a;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.serpumar.sprint0_3a.ClasesPojo.Medicion;
import com.example.serpumar.sprint0_3a.ClasesPojo.Ubicacion;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LogicaFake {

    private String jsonString;

    private JSONObject json;

    private String url = "http://igmagi.upv.edu.es"; //Ip Zona Wifi telefono móvil -- SI SE CAMBIA AQUI, en el network_secutiry_config.xml tambien

    private Activity Activitycontext_;


    // medicion:<R> --> enviarMedicion()
    public void guardarMedicion(int medicion, Ubicacion ubi, String momento, Context context) { //Guardar Medicion en la base de datos (POST)
        //Json con valorMedida y Ubicacion (latitud y longitud)
        Map<String, String> parametros = new HashMap<>();
        parametros.put("valor", String.valueOf(medicion));
        parametros.put("ubicacion", ubi.getLatitud() + "," + ubi.getLongitud());
        parametros.put("momento", momento.toString());

        JSONObject jsonParametros = new JSONObject(parametros);

        Log.d("JSON GuardarMedicion",jsonParametros.toString());

        RequestQueue queue = Volley.newRequestQueue(context);
        JsonRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, url + "/insertarMedicion", jsonParametros, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Log.d("Response", "medicion guardada en base de datos");
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Error.Response", error.toString());
            }
        });

        queue.add(jsonRequest);

    }

    public void obtenerMedicion(final Context context) { //Obtener Medicion de la base de datos (GET)
        RequestQueue queue = Volley.newRequestQueue(context);
        Activitycontext_ = (Activity) context;
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url + "/mediciones", new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d("Response", response);
                jsonString = response;
                List<JSONObject> list = new ArrayList<JSONObject>();
                try {
                    int i;
                    JSONArray array = new JSONArray(jsonString);
                    json= array.getJSONObject(array.length()-1);
                    //Medicion medicion = new Medicion(json.,json );
                } catch (JSONException e) {
                    Log.d("Error Json",e.getMessage());
                }
                TextView textoValores = ((Activity) context).findViewById(R.id.cajaMediciones);
                textoValores.setText(json.toString());


            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Error.Response", error.toString());
            }
        }

        );
        queue.add(stringRequest);
    }

    public void obtenerMedicionesOficialesAPI(final Context context) { //Obtener Medicion de la base de datos (GET)
        RequestQueue queue = Volley.newRequestQueue(context);
        Activitycontext_ = (Activity) context;
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url + "/medicionesOficiales", new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d("Response", response);
                jsonString = response;
                List<JSONObject> list = new ArrayList<JSONObject>();
                try {
                    int i;
                    JSONArray array = new JSONArray(jsonString);
                    json= array.getJSONObject(array.length()-1);
                    //Medicion medicion = new Medicion(json.,json );
                } catch (JSONException e) {
                    Log.d("Error Json",e.getMessage());
                }
                TextView textoValores = ((Activity) context).findViewById(R.id.cajaMediciones);
                textoValores.setText(json.toString());


            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Error.Response", error.toString());
            }
        }

        );
        queue.add(stringRequest);
    }

    public void obtenerMedicionesOficialesLOCAL(final Context context) { //Obtener Medicion de la base de datos (GET)
        RequestQueue queue = Volley.newRequestQueue(context);
        Activitycontext_ = (Activity) context;
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url + "/medicionesOficialesCSV", new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d("Response", response);
                jsonString = response;
                List<JSONObject> list = new ArrayList<JSONObject>();
                try {
                    int i;
                    JSONArray array = new JSONArray(jsonString);
                    json= array.getJSONObject(array.length()-1);
                    //Medicion medicion = new Medicion(json.,json );
                } catch (JSONException e) {
                    Log.d("Error Json",e.getMessage());
                }
                TextView textoValores = ((Activity) context).findViewById(R.id.cajaMediciones);
                textoValores.setText(json.toString());


            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Error.Response", error.toString());
            }
        }

        );
        queue.add(stringRequest);
    }

    public void guardarMedicion(Medicion ultimaMedicion, Context context) {
        //Json con valorMedida y Ubicacion (latitud y longitud)
        Map<String, String> parametros = new HashMap<>();
        parametros.put("valor", ultimaMedicion.getMedicion()+"");
        parametros.put("ubicacion", ultimaMedicion.getUbicacion().getLatitud() + "," + ultimaMedicion.getUbicacion().getLongitud());
        parametros.put("momento", ultimaMedicion.getDate());
        parametros.put("tipoMedicion", "O3");
        parametros.put("idUsuario", -1+"");

        JSONObject jsonParametros = new JSONObject(parametros);

        RequestQueue queue = Volley.newRequestQueue(context);
        JsonRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, url + "/medicion", jsonParametros, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Log.d("Response", "medicion guardada en base de datos");
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Error.Response", error.toString());
            }
        });

        queue.add(jsonRequest);
    }
}
