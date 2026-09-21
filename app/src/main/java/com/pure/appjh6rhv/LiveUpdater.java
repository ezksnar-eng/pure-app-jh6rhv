package com.pure.appjh6rhv;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public final class LiveUpdater {

    private LiveUpdater() {
    }

    public static long readVersion(File stateDir) {
        try {
            return Long.parseLong(readText(new File(stateDir, "version.txt")).trim());
        } catch (Exception e) {
            return 0L;
        }
    }

    public static String readEntry(File stateDir, String fallback) {
        String s = readText(new File(stateDir, "entry.txt")).trim();
        return s.length() == 0 ? fallback : s;
    }

    public static void writeState(File stateDir, long version, String entry) {
        stateDir.mkdirs();
        writeText(new File(stateDir, "version.txt"), String.valueOf(version));
        if (entry != null && entry.length() > 0) {
            writeText(new File(stateDir, "entry.txt"), entry);
        }
    }

    /** Installs newer remote content if there is any. Blocking: call it from a background thread. */
    public static boolean update(String base, File target, File stateDir, long haveVersion, boolean replace) {
        try {
            String manifest = new String(fetch(base + "manifest.json?t=" + System.currentTimeMillis()), "UTF-8");
            Matcher mv = Pattern.compile("\"version\"\\s*:\\s*(\\d+)").matcher(manifest);
            if (!mv.find()) {
                return false;
            }
            long ver = Long.parseLong(mv.group(1));
            if (ver <= haveVersion) {
                return false;
            }
            String entry = "";
            Matcher me = Pattern.compile("\"entry\"\\s*:\\s*\"((?:[^\"\\\\]|\\\\.)*)\"").matcher(manifest);
            if (me.find()) {
                entry = me.group(1).replace("\\\"", "\"").replace("\\\\", "\\");
            }
            byte[] zip = fetch(base + "content.zip?t=" + ver);
            stateDir.mkdirs();
            File tmp = new File(stateDir, "tmp");
            deleteRec(tmp);
            tmp.mkdirs();
            unzip(zip, tmp);
            if (replace) {
                deleteRec(target);
                File parent = target.getParentFile();
                if (parent != null) {
                    parent.mkdirs();
                }
                if (!tmp.renameTo(target)) {
                    return false;
                }
            } else {
                copyTree(tmp, target);
                deleteRec(tmp);
            }
            writeState(stateDir, ver, entry);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private static byte[] fetch(String u) throws IOException {
        HttpURLConnection c = (HttpURLConnection) new URL(u).openConnection();
        try {
            c.setConnectTimeout(8000);
            c.setReadTimeout(30000);
            c.setUseCaches(false);
            if (c.getResponseCode() != 200) {
                throw new IOException("HTTP " + c.getResponseCode());
            }
            InputStream in = c.getInputStream();
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            byte[] buf = new byte[8192];
            int r;
            while ((r = in.read(buf)) != -1) {
                bo.write(buf, 0, r);
            }
            in.close();
            return bo.toByteArray();
        } finally {
            c.disconnect();
        }
    }

    private static void unzip(byte[] zip, File dest) throws IOException {
        String root = dest.getCanonicalPath() + File.separator;
        ZipInputStream zis = new ZipInputStream(new ByteArrayInputStream(zip));
        try {
            ZipEntry e;
            byte[] buf = new byte[8192];
            while ((e = zis.getNextEntry()) != null) {
                if (e.isDirectory()) {
                    continue;
                }
                File out = new File(dest, e.getName());
                if (!out.getCanonicalPath().startsWith(root)) {
                    continue;
                }
                File parent = out.getParentFile();
                if (parent != null) {
                    parent.mkdirs();
                }
                OutputStream fo = new FileOutputStream(out);
                int r;
                while ((r = zis.read(buf)) != -1) {
                    fo.write(buf, 0, r);
                }
                fo.close();
            }
        } finally {
            zis.close();
        }
    }

    private static void copyTree(File from, File to) throws IOException {
        if (from.isDirectory()) {
            to.mkdirs();
            String[] names = from.list();
            if (names != null) {
                for (String n : names) {
                    copyTree(new File(from, n), new File(to, n));
                }
            }
        } else {
            File parent = to.getParentFile();
            if (parent != null) {
                parent.mkdirs();
            }
            InputStream in = new FileInputStream(from);
            OutputStream out = new FileOutputStream(to);
            byte[] buf = new byte[8192];
            int r;
            while ((r = in.read(buf)) != -1) {
                out.write(buf, 0, r);
            }
            out.close();
            in.close();
        }
    }

    private static void deleteRec(File f) {
        if (f == null || !f.exists()) {
            return;
        }
        if (f.isDirectory()) {
            File[] kids = f.listFiles();
            if (kids != null) {
                for (File k : kids) {
                    deleteRec(k);
                }
            }
        }
        f.delete();
    }

    private static String readText(File f) {
        try {
            InputStream in = new FileInputStream(f);
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            byte[] buf = new byte[1024];
            int r;
            while ((r = in.read(buf)) != -1) {
                bo.write(buf, 0, r);
            }
            in.close();
            return new String(bo.toByteArray(), "UTF-8");
        } catch (Exception e) {
            return "";
        }
    }

    private static void writeText(File f, String s) {
        try {
            OutputStream out = new FileOutputStream(f);
            out.write(s.getBytes("UTF-8"));
            out.close();
        } catch (Exception ignored) {
        }
    }
}
