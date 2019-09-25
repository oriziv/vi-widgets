export const config = {
    // General comment: think very carefully about required fields - you can't added required fields to a schema once released without a breaking change
    "$id":"https://api.videoindexer.ai/schema/widgets",
    "$schema": "https://api.videoindexer.ai/schema/widgets", // This can aid clients with generating classes etc., if a pain forget it. Do not provide a path that exposes DNS that we don't want exposed, or that can change, such an online-path is a contract.
    "schemaVersion": "1.0", // The version of the schema of this configuration JSON. I think Major.Minor is enough - either you have a breaking change increasing the monitor, or an addition increasing the minor. More complex versioning works better for code, not data.
    "required": ["widgets"],
    "properties": {
        "widgets": {
            "insights": {
                "widgetDataSources": { // A multi-map from data source name (string) to a description of how to get that data
                    "videoIndex": { 
                        "schemaVersion": "1.0", // The versions of the schema of data needed by the widget
                        "uri": "https://www.contoso.com/vi/asw34eds/index/default", // The widget will GET this URL
                        "httpHeaders": { // A dictionary of headers the widget will include with requests, can be empty
                            "Authorization": "Bearer JWT"
                        },
                        "properties": { // Custom properties for the videoIndex widget this is for extensibility, clients with typed languages should represent this as open string->object
                            "translations": {
                                "en-EN": {
                                    "uri": "https://www.contoso.com/vi/asw34eds/index/en-EN"
                                },
                                "he-IL": {
                                    "uri": "https://www.contoso.com/vi/asw34eds/index/he-IL"
                                }
                            }
                        }
                    },
                    "keyframeSprite": {
                        "schemaVersion": "1.0", // The versions of the schema of data needed by the widget
                        "uri": "https://www.contoso.com/vi/{$videoId}/keyframes/{$pageId}", // The widget will GET this URL
                        "httpHeaders": { // A dictionary of headers the widget will include with requests, can be empty
                            "Authorization": "Bearer JWT"
                        },
                        "properties": { // Custom properties for the keyframeSprite widget, this is for extensibility, clients with typed languages should represent this as open string->object
                            "paging": true,
                            "pageSize": 100
                        }        
                    }
                },
                "properties" : { // Custom properties for the widget this is for extensibility, clients with typed languages should represent this as open string->object
                    "locale": "de",
                    "tab": "timeline",
                    "render": {
                        "people": true,
                        "topics": true
                    }
                }
            },
            "player": {
                "widgetDataSources": {
                    "videoStream": {
                        "schemaVersion": "1.0", // The versions of the schema of data needed by the widget
                        "uri": "https://www.contoso.com/vi/asw34eds/streaming", // The widget will GET this URL
                        "httpHeaders": { // A dictionary of headers the widget will include with requests, can be empty
                            "Authorization": "Bearer JWT"
                        },
                        "properties": { // Custom properties for the videoStream data source, this is for extensibility, clients with typed languages should represent this as open string->object
                        }        
                    },
                    "captions": {
                        "uri": "..."
                    },
                },   
                "properties": { // Custom properties for the player widget, this is for extensibility, clients with typed languages should represent this as open string->object
                    "t": 123, // Don't know what 't' means, I figure customers won't know as well, better rename it
                    "captions": "de-DE",
                    "showCaptions": false, // Why this flag? If not show captions, just have "null" in captions (null isn't same as property not there, property not there should be interperted as older schema version before the property existed)
                    "type": "video",
                    "autoplay": false,
                    "language": "en-EN",
                    "captionsDataSource": {
                        "uri": "..."
                    }
                }
            }
        }
    }
}
