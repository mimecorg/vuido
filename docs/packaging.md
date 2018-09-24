# Packaging

Although native desktop applications can run in the standard Node.js environment, it is recommended to use [LaunchUI](https://github.com/mimecorg/launchui) to package and distribute them to end users.

Thanks to LaunchUI, users don't need to install any packages using npm or to use the command line. They don't even need to have Node.js installed. They can simply download the package, unzip it and run the application by double-clicking its icon.

LaunchUI wraps Node.js with a small executable which automatically runs the application. No console window is opened and in case of a fatal error, it is reported using a message box.

The easiest way to create a package for your application is to use the [LaunchUI Packager](https://github.com/mimecorg/launchui-packager). It provides an API for creating packages for Windows, Linux and OS X.

You can also use [LaunchUI Packager GUI](https://github.com/mimecorg/launchui-packager-gui), a desktop application which simplifies creating LaunchUI packages without using custom scripts.

To manually package your application, download the binary package for your target platform from [LaunchUI releases](https://github.com/mimecorg/launchui/releases), unpack it and replace the example `app/main.js` script with your application script.

