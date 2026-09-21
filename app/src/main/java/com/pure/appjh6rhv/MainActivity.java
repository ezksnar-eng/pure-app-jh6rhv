package com.pure.appjh6rhv;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.webkit.WebViewAssetLoader;

import java.io.File;

public class MainActivity extends Activity {

    private static final String START_URL = "https://appassets.androidplatform.net/assets/www/index.html";
    private static final boolean BUNDLED = true;
    private static final boolean FULLSCREEN = true;
    private static final boolean ALLOW_ZOOM = false;
    private static final boolean LIGHT_STATUS = false;
    private static final String STATUS_COLOR = "#c81466";
    private static final String LIVE_BASE = "";
    private static final long BUNDLED_VERSION = 1790016684L;
    private static final String ENTRY = "index.html";
    private static final String ASSET_HOST = "appassets.androidplatform.net";
    private static final int FILE_REQ = 4242;

    private WebView webView;
    private ValueCallback<Uri[]> fileCallback;
    private WebViewAssetLoader assetLoader;
    private File liveDir;

    @SuppressLint("SetJavaScriptEnabled")
    @SuppressWarnings("deprecation")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        liveDir = new File(getFilesDir(), "live");
        liveDir.mkdirs();
        assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .addPathHandler("/live/", new WebViewAssetLoader.InternalStoragePathHandler(this, liveDir))
                .build();

        webView = new WebView(this);
        setContentView(webView);
        applyWindow();

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(true);
        s.setUseWideViewPort(true);
        s.setLoadWithOverviewMode(true);
        s.setSupportZoom(ALLOW_ZOOM);
        s.setBuiltInZoomControls(ALLOW_ZOOM);
        s.setDisplayZoomControls(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);

        CookieManager cookies = CookieManager.getInstance();
        cookies.setAcceptCookie(true);
        cookies.setAcceptThirdPartyCookies(webView, true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleUrl(request.getUrl());
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (fileCallback != null) {
                    fileCallback.onReceiveValue(null);
                }
                fileCallback = callback;
                try {
                    startActivityForResult(params.createIntent(), FILE_REQ);
                } catch (Exception e) {
                    fileCallback = null;
                    return false;
                }
                return true;
            }
        });

        webView.setDownloadListener(new DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimetype, long contentLength) {
                openExternal(Uri.parse(url));
            }
        });

        boolean restored = savedInstanceState != null && webView.restoreState(savedInstanceState) != null;
        if (!restored) {
            webView.loadUrl(startUrl());
        }
        startLiveCheck();
    }

    private String startUrl() {
        if (BUNDLED && LIVE_BASE.length() > 0) {
            File content = new File(liveDir, "content");
            if (content.exists() && LiveUpdater.readVersion(liveDir) > BUNDLED_VERSION) {
                String e = LiveUpdater.readEntry(liveDir, ENTRY);
                return "https://" + ASSET_HOST + "/live/content/" + Uri.encode(e, "/");
            }
        }
        return START_URL;
    }

    private void startLiveCheck() {
        if (!BUNDLED || LIVE_BASE.length() == 0) {
            return;
        }
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                long have = Math.max(BUNDLED_VERSION, LiveUpdater.readVersion(liveDir));
                boolean updated = LiveUpdater.update(LIVE_BASE, new File(liveDir, "content"), liveDir, have, true);
                if (updated) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            if (webView != null) {
                                Toast.makeText(MainActivity.this, "\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u062a\u0637\u0628\u064a\u0642 \u2728", Toast.LENGTH_SHORT).show();
                                webView.loadUrl(startUrl());
                            }
                        }
                    });
                }
            }
        });
        t.setDaemon(true);
        t.start();
    }

    private boolean handleUrl(Uri uri) {
        String scheme = uri.getScheme();
        String host = uri.getHost();
        if (ASSET_HOST.equals(host)) {
            return false;
        }
        if ("http".equals(scheme) || "https".equals(scheme)) {
            if (!BUNDLED) {
                return false;
            }
            openExternal(uri);
            return true;
        }
        if ("about".equals(scheme) || "data".equals(scheme) || "blob".equals(scheme) || "javascript".equals(scheme)) {
            return false;
        }
        openExternal(uri);
        return true;
    }

    private void openExternal(Uri uri) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
        } catch (Exception ignored) {
        }
    }

    @SuppressWarnings("deprecation")
    private void applyWindow() {
        try {
            getWindow().setStatusBarColor(Color.parseColor(STATUS_COLOR));
        } catch (Exception ignored) {
        }
        View decor = getWindow().getDecorView();
        int flags = decor.getSystemUiVisibility();
        if (LIGHT_STATUS) {
            flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
        }
        decor.setSystemUiVisibility(flags);
        if (FULLSCREEN) {
            enterImmersive();
        }
    }

    @SuppressWarnings("deprecation")
    private void enterImmersive() {
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus && FULLSCREEN) {
            enterImmersive();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == FILE_REQ) {
            if (fileCallback != null) {
                fileCallback.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, data));
                fileCallback = null;
            }
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        if (webView != null) {
            webView.saveState(outState);
        }
    }

    @SuppressWarnings("deprecation")
    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (webView != null) {
            webView.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) {
            webView.onResume();
        }
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}
