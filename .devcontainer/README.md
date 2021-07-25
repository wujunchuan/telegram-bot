You can use a devcontainer.json file to define a Codespaces environment for your repository.

创建 `.devcontainer/` 文件夹，包含以下文件
    - `devcontainer.json`
    - `Dockerfile`
或者 `devcontainer.json`


将容器端口映射到本地|公网，并且可以选择是否支持 HTTPS

这可牛逼了，见下。

![端口转发](https://i.loli.net/2021/07/24/zhpqbeyLvD1Wm6Q.png)

reference:

GitHub 上的文档
https://docs.github.com/en/codespaces/customizing-your-codespace/configuring-codespaces-for-your-project#applying-changes-to-your-configuration

microsoft/vscode-dev-containers
https://github.com/microsoft/vscode-dev-containers
