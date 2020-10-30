package com.example.serpumar.sprint0_3a;

import android.app.Activity;
import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.util.Log;
import android.widget.TextView;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.RetryPolicy;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.JsonRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LogicaFake {

    private String jsonString;

    private JSONObject json;

    private String url = "http://192.168.43.245:8080"; //Ip Zona Wifi telefono móvil -- SI SE CAMBIA AQUI, en el network_secutiry_config.xml tambien

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

    public void obtenerMedicion(Context context) { //Obtener Medicion de la base de datos (GET)

        RequestQueue queue = Volley.newRequestQueue(context);
        Activitycontext_ = (Activity) context;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url + "/obtenerMediciones", new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.d("Response", response);
                jsonString = response;
                List<JSONObject> list = new ArrayList<JSONObject>();
                try {
                    int i;
                    JSONArray array = new JSONArray(jsonString);
                    json= array.getJSONObject(array.length()-1);
                } catch (JSONException e) {
                    Log.d("Error Json",e.getMessage());
                }
                TextView textoValores = (TextView)Activitycontext_.findViewById(R.id.textView_valores);
                textoValores.setText(json.toString());


            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("Error.Response", error.toString());
            }
        }

        );

        /*stringRequest.setRetryPolicy(new DefaultRetryPolicy(
                5000,
                DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));*/

        queue.add(stringRequest);


    }

}
