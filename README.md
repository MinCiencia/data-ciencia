# Dataplatform
Visualización y descubrimiento de datasets. El presente repositorio es la capa de presentación para la visualización de los conjuntos de datos.


## Componentes
1. Home

- Caracteristicas
```json
{
        "cards": [
          {
            "titulo": "str",
            "descripcion": "str",
            "url": "str"
          }
        ]
}
```
2. Datasets

- Caracteristicas:
```json
{
        "nombre": "str",
        "descripcion": "str",
        "fuente": "str",
        "autor": "str",
        "licencia": "str",
        "imagen": "str",
        "last_update": "int",
        "last_dataset": "str",
        "history": [
            {
                "date": "int",
                "name": "str",
                "path": "str"
            }
        ],
        "headers": [{}],
        "dataTable": [{}],
}
```


