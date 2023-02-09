/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2023-02-09 15:04:08
 * @LastEditTime: 2023-02-09 15:19:54
 * @LastEditors: 最爱白菜吖
 * @FilePath: \electron-vite-vue\electron\main.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2023 by 武汉跃码教育, All Rights Reserved.
 */
require("v8-compile-cache");
import { resolve } from "path";
import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  nativeImage,
  shell,
  Tray,
} from "electron";
import { join } from "path";
import * as bytenode from "bytenode";
import { writeFileSync } from "fs";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
const isMac = process.platform === "darwin";

let mainWindow: BrowserWindow;
function encryptFile() {
  // 加密electron入口文件
  bytenode.compileFile({
    filename: __dirname + "/main.cjs",
    output: __dirname + "/main.jsc",
  });
  const tpl = `require('bytenode');
require(__dirname + '/main.jsc');`;
  writeFileSync(__dirname + "/main.cjs", tpl);

  // 告诉编译插件加密完成，插件收到消息开始打包
  process.send!("加密完成");
}
const createMenu = () => {
  const template: (MenuItemConstructorOptions | MenuItem)[] = [
    {
      role: "help",
      label: "帮助中心",
      submenu: [
        {
          label: "我的主页",
          click: async () => {
            await shell.openExternal("https://space.bilibili.com/388985971");
          },
        },
      ],
    },
  ];

  if (isMac) {
    template.unshift({
      label: app.name,
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    });
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
const createTray = () => {
  const icon = nativeImage.createFromPath(
    resolve(__dirname, "..", "..", "favicon_256.ico")
  );
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "退出",
      click: () => {
        if (process.platform !== "darwin") {
          app.quit();
        } else {
          app.exit();
        }
      },
    },
  ]);
  tray.setToolTip("codedesktop\n开放API");
  tray.setTitle("codedesktop");
  tray.on("click", () => {
    mainWindow.show();
  });
  tray.on("right-click", () => {
    tray.setContextMenu(contextMenu);
  });
};
function createWindow() {
  let config: BrowserWindowConstructorOptions = {
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
    backgroundColor: "#F5F5F5",
    show: process.env.NODE_ENV !== "building",
    icon: join(__dirname, "favicon_256.ico"),
  };
  mainWindow = new BrowserWindow(config);
  if (process.argv[2]) {
    mainWindow.webContents.openDevTools({ mode: "undocked" });
    mainWindow.loadURL(process.argv[2]);
  } else {
    mainWindow.loadURL(`file://${join(__dirname, "..", "index.html")}`);
  }
}
app.whenReady().then(() => {
  createTray();
  createMenu();
  createWindow();
  if (process.env.NODE_ENV === "building") {
    encryptFile();
  }
});
