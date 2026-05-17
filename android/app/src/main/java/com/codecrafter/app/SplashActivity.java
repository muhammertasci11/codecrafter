package com.codecrafter.app;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.core.content.FileProvider;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class SplashActivity extends Activity {

    private static final String VERSION_URL = "https://codicrafter.netlify.app/version.json";
    private static final String APK_FILE_NAME = "codecrafter.apk";

    private TextView textStatus;
    private ProgressBar progressBar;
    private Button btnUpdate;
    private Button btnRetry;
    private TextView textPercent;

    private int latestVersionCode;
    private String apkUrl;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        textStatus = findViewById(R.id.textStatus);
        progressBar = findViewById(R.id.progressBar);
        btnUpdate = findViewById(R.id.btnUpdate);
        btnRetry = findViewById(R.id.btnRetry);
        textPercent = findViewById(R.id.textPercent);

        btnUpdate.setOnClickListener(v -> startDownload());
        btnRetry.setOnClickListener(v -> checkForUpdate());

        checkForUpdate();
    }

    private void checkForUpdate() {
        textStatus.setText("Checking for updates...");
        progressBar.setVisibility(View.GONE);
        btnUpdate.setVisibility(View.GONE);
        btnRetry.setVisibility(View.GONE);
        textPercent.setVisibility(View.GONE);

        new Thread(() -> {
            try {
                URL url = new URL(VERSION_URL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setConnectTimeout(8000);
                conn.setReadTimeout(8000);

                int responseCode = conn.getResponseCode();
                if (responseCode != 200) {
                    proceedToApp("Update server unavailable (" + responseCode + ")");
                    return;
                }

                StringBuilder sb = new StringBuilder();
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                }
                reader.close();

                JSONObject json = new JSONObject(sb.toString());
                latestVersionCode = json.getInt("latestVersionCode");
                apkUrl = json.getString("apkUrl");
                int currentVersionCode = BuildConfig.VERSION_CODE;

                if (currentVersionCode >= latestVersionCode) {
                    proceedToApp(null);
                } else {
                    runOnUiThread(() -> {
                        textStatus.setText("New version available!");
                        btnUpdate.setVisibility(View.VISIBLE);
                    });
                }

            } catch (Exception e) {
                proceedToApp("Check failed: " + e.getMessage());
            }
        }).start();
    }

    private void startDownload() {
        textStatus.setText("Downloading update...");
        btnUpdate.setVisibility(View.GONE);
        progressBar.setVisibility(View.VISIBLE);
        progressBar.setIndeterminate(false);
        progressBar.setProgress(0);
        textPercent.setVisibility(View.VISIBLE);
        textPercent.setText("0%");

        new Thread(() -> {
            try {
                URL url = new URL(apkUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.connect();

                int fileLength = conn.getContentLength();
                File file = new File(getCacheDir(), APK_FILE_NAME);

                InputStream is = conn.getInputStream();
                FileOutputStream os = new FileOutputStream(file);

                byte[] buffer = new byte[8192];
                int bytesRead;
                long totalBytes = 0;

                while ((bytesRead = is.read(buffer)) != -1) {
                    os.write(buffer, 0, bytesRead);
                    totalBytes += bytesRead;
                    if (fileLength > 0) {
                        final int percent = (int) (totalBytes * 100 / fileLength);
                        runOnUiThread(() -> {
                            progressBar.setProgress(percent);
                            textPercent.setText(percent + "%");
                        });
                    }
                }

                os.close();
                is.close();

                runOnUiThread(() -> installApk(file));

            } catch (Exception e) {
                runOnUiThread(() -> {
                    textStatus.setText("Download failed");
                    progressBar.setVisibility(View.GONE);
                    textPercent.setVisibility(View.GONE);
                    btnRetry.setVisibility(View.VISIBLE);
                });
            }
        }).start();
    }

    private void installApk(File file) {
        try {
            Uri uri = FileProvider.getUriForFile(
                this,
                "com.codecrafter.app.fileprovider",
                file
            );

            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setDataAndType(uri, "application/vnd.android.package-archive");
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            finish();

        } catch (Exception e) {
            textStatus.setText("Install error: " + e.getMessage());
            btnRetry.setVisibility(View.VISIBLE);
        }
    }

    private void proceedToApp(String message) {
        runOnUiThread(() -> {
            if (message != null) {
                textStatus.setText(message);
            }

            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
            finish();
        });
    }
}
