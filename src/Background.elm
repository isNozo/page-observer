port module Background exposing (..)

port notify : () -> Cmd msg

main =
    Platform.worker { init = init
                    , update = update
                    , subscriptions = subscriptions
                    }

type alias Model = {}
type alias Msg = {}

init : () -> (Model, Cmd Msg)
init _ = Debug.log "Background is inited!" ({}, notify ())

update : Msg -> Model -> (Model, Cmd Msg)
update msg model = ({}, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model = Sub.none
