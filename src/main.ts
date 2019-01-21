import * as electron from "electron";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Quit when all windows are closed.
app.on("window-all-closed", () =>
{
	app.quit();
});

app.on("ready", () =>
{
	if(process.argv.length > 1)
	{
		// The /p option tells us to display the screen saver in the tiny preview window in the Screen Saver Settings dialog.
		if(process.argv[1] === "/p")
		{
			app.quit();
			return;
		}

		// The /S option is passed when the user chooses Configure from the .scr file context menu (although we don't see this in practice).
		// The /c:# option is passed when the user clicks Settings... in the Screen Saver Settings dialog.
		if((process.argv[1] === "/S")
		|| process.argv[1].match(/^\/c/))
		{
			electron.dialog.showMessageBox({ message: "This screen saver has no options that you can set.", buttons: [ "OK" ] });
			app.quit();
			return;
		}

	}

	electron.screen.getAllDisplays().forEach( (display) => {
		let mainWindow = new BrowserWindow({
			x: display.bounds.x,
			y: display.bounds.y,
			show: false,
			autoHideMenuBar: true
		});
		mainWindow.loadURL("file://" + __dirname + "/index.html");
		mainWindow.on("closed", () => { mainWindow = null });
		setTimeout( () => {
			mainWindow.setKiosk(true);
			mainWindow.setAlwaysOnTop(true);
			mainWindow.show();
		}, 2000);
	});

});
