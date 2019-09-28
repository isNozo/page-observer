port module Content exposing (..)

port observe : (String -> msg) -> Sub msg

main = Platform.worker { init = init
                       , update = update
                       , subscriptions = subscriptions
                       }

type alias Model = {}
type Msg = Changed String

init : () -> (Model, Cmd Msg)
init _ = Debug.log "Content.elm is inited!" ({}, Cmd.none)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Changed text -> Debug.log ("Received Changed message : " ++ text) ({}, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model =
    observe Changed
