# 初回起動時にやること

codex認証後、以下を実行する

```
uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context ide-assistant
```

```
codex mcp add serena -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context codex
```

あとでDockerimage変えよう。
```
nvm install 20.19.0
```
