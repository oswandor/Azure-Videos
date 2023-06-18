
ctr - shit - v 


## Para crear un pod de Nginx en Kubernetes y accederlo desde tu PC local, sigue los siguientes pasos:

1. Asegúrate de tener Kubernetes instalado y configurado en tu sistema local.
2. Crea un archivo YAML con la definición del pod de Nginx. Por ejemplo, puedes crear un archivo `nginx-pod.yaml` con el siguiente contenido:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx
```

Este archivo define un pod con un contenedor que utiliza la imagen de Nginx.

3. Aplica la definición del pod ejecutando el siguiente comando:

```bash
kubectl apply -f nginx-pod.yaml
```

Esto creará el pod en tu clúster de Kubernetes.

4. Verifica que el pod esté en ejecución ejecutando el siguiente comando:

```bash
kubectl get pods
```

Esto debería mostrar una lista de los pods en tu clúster, incluyendo el pod de Nginx.

5. Crea un puerto de reenvío (forward) desde el pod de Nginx a tu máquina local, para que puedas acceder a él desde tu navegador. Ejecuta el siguiente comando:

```bash
kubectl port-forward nginx-pod 8080:80
```

Este comando crea un puerto de reenvío desde el puerto 80 del contenedor de Nginx al puerto 8080 de tu máquina local.

6. Abre tu navegador y accede a `http://localhost:8080`. Deberías ver la página de bienvenida de Nginx.

Con estos pasos, has creado un pod de Nginx en Kubernetes y puedes acceder a él desde tu máquina local a través de un puerto de reenvío.







## Para tener dos pods comunicados entre sí y exponer los puertos, puedes crear un objeto Deployment en Kubernetes para crear dos pods y un objeto Service para exponer los puertos.

A continuación, te muestro un ejemplo de cómo podrías hacerlo:

1. Crear el archivo YAML para el objeto Deployment. Por ejemplo, puedes crear un archivo llamado `app-deployment.yaml` con el siguiente contenido:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: app-label
  template:
    metadata:
      labels:
        app: app-label
    spec:
      containers:
      - name: app-container
        image: tuimagen/app:latest
        ports:
        - containerPort: 80
```

En este archivo YAML, se define un Deployment que crea dos réplicas (pods) de un contenedor de aplicación, utilizando la imagen `tuimagen/app:latest`. El contenedor expone el puerto 80.

2. Aplicar el archivo YAML del objeto Deployment:

```bash
kubectl apply -f app-deployment.yaml
```

Esto creará el Deployment con los dos pods.

3. Crear el archivo YAML para el objeto Service. Por ejemplo, puedes crear un archivo llamado `app-service.yaml` con el siguiente contenido:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: app-label
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP
```

En este archivo YAML, se define un Service que selecciona los pods creados por el Deployment utilizando la etiqueta `app: app-label`. El Service expone el puerto 80 y lo mapea al puerto 80 de los pods.

4. Aplicar el archivo YAML del objeto Service:

```bash
kubectl apply -f app-service.yaml
```

Esto creará el Service y expondrá los puertos de los pods.

Ahora, los dos pods estarán comunicados entre sí y los puertos estarán expuestos a través del Service. Para verificar que todo esté funcionando correctamente, puedes ejecutar el siguiente comando para obtener la IP del Service:

```bash
kubectl get services
```

Luego, puedes acceder a la aplicación en el navegador utilizando la dirección IP del Service y el puerto expuesto (por ejemplo, `http://<IP del Service>:80`). Si todo está configurado correctamente, deberías ver la aplicación en el navegador.







