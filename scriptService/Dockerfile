#Ahora con Python
FROM python:3.7.9
RUN mkdir -p /usr/src/scriptService
WORKDIR /usr/src/scriptService
COPY . .
EXPOSE 3500
#Instalamos dependencias
RUN apt-get update && apt-get -y install cmake protobuf-compiler
RUN pip install -r requirements.txt
#Corremos
CMD ["script.py"]
ENTRYPOINT ["python3"]