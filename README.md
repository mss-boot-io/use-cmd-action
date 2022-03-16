# Use CMD Tool For Action

## usage

```yaml
- name: Discover Staging
  uses: mss-boot-io/use-cmd-action@v1
  with:
    app: endpoint-discover
  env:
    namespace: staging
    configmap_name: endpoint-discover
    protocols: 'grpc,http'
    config_name: 'endpoints.yml'
```

## add your cmd tool

> add your config to file config/cmd-list.json, then pr to this repo's main branch, e.g.:

```json
[
  {
    "app": "configmap-update",
    "source": "https://mss-boot-io.github.io/configmap-update/v0.7/linux_amd64"
  },
  {
    "app": "endpoint-discover",
    "source": "https://mss-boot-io.github.io/endpoint-discover/v0.0.4/linux_amd64"
  },
  {
    "app": "your cmd tool name",
    "source": "your cmd tool download url "
  }
]
```

## maybe you can create your config, for example:

```yaml
- name: Discover Staging
  uses: mss-boot-io/use-cmd-action@v1
  with:
    app: endpoint-discover
    url: 'your tool list json config'
  env:
    namespace: staging
    configmap_name: endpoint-discover
    protocols: 'grpc,http'
    config_name: 'endpoints.yml'
```
