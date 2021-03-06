dojo.provide("racquelDijits.racquelServiceConfig");
dojo.require("esri.IdentityManager"); // manage secured services, if any
// this class is just a place to define the URLs for the route, identify, and catchment services 
// that will be used to add graphics to the map
// the catchment service also needs to define the extraction options that are available (TODO)
// all properties are "static" i.e. same across all instantiations, as they're not in the constructor
dojo.declare("racquelDijits.racquelServiceConfig",[],{
	// The service giving access to the data that will be used by the site search (=identify task)
	core: {
		racquelSiteService: {
			URL: "http://wlwater.ceh.ac.uk/ArcGIS/rest/services/RACQUEL/RACQUEL_At_Site_Core/MapServer",
			Layers: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
			LayerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_ALL
		},
		// The service giving access to the river and nodes data - not the network / routing service
		// Must include river lines, nodes, sources, mouths
		// Assumptions: geometry field in riverlines is called "SHAPE", snapping distance for selecting a 
		// river is 250m. If required, set them here and update routeSearch code to pull them out
		racquelRiversDataService: {
			URL: "http://wlwater.ceh.ac.uk/ArcGIS/rest/services/RACQUEL/RACQUEL_River_Data/MapServer",
			Nodes: {
				LayerNum: 2,
				// database table name of nodes layer, for use in where clause of join queries
				TableName: "NRFA_SDE.IRN_NODES",
				IdField: "NODEID_FULL",
				NodeSourceField: "SOURCENODE_FULL", // matches to IdField of Sources table for join queries
				NodeMouthField: "MOUTHNODE_FULL" // likewise
			},
			Sources: {
				LayerNum: 0,
				TableName: "", // not required
				IdField: "SOURCEID_FULL" // name of the identifier field in sourcelayer that matches with nodes table
			},
			Mouths: {
				LayerNum: 3,
				TableName: "",
				IdField: "MOUTHID_FULL"
			},
			TidalMouths: {
				LayerNum: 1,
				TableName: "",
				IdField: "TIDEID_FULL"
			},
			RiverLines: {
				LayerNum: 4,
				FromField: "FNODE_FULL", // matches node id definied in IdField of Nodes
				ToField: "TNODE_FULL", // likewise
				DisplayName: "OS_NAME",
				FetchFields: ["OS_NAME", "LENGTH", "STRAHLER", "SHREVE", "WORK_", "WORKTYPE", "FNODE_FULL", "TNODE_FULL"]
			}
		},
		racquelRouteService: {
			URL: "http://wlwater.ceh.ac.uk/ArcGIS/rest/services/RACQUEL/RACQUEL_Routing_Core/NAServer/IRN_Route_Layer"
		},
		
		// in AvailableExtractionParams we define the parameters that are available with the SOE - see the 
		// REST directory for the service it's being called on
		// The name of each parameter is the REST parameter name required, it will either be called as true or false.
		// The associated value with each parameter contains a name parameter which will define what the results
		// are called when displayed. The type parameter tells the display code how to summarise the results and
		// what sort of fields the SOE will return:
		// - Categorical: one field for each category; get the percentages, 
		// - Continuous: one field for each of max, min, mean. 
		// - Literal - one field, to be treated / displayed directly .
		// Finally the responsePrefix parameter which tells it which fields in the SOE result correspond with this 
		// dataset (the SOE results are returned as a single unstructured object).
			
		racquelCatchmentService: {
			URL: "http://wlwater.ceh.ac.uk/ArcGIS/rest/services/RACQUEL/RACQUEL_Catchment_Core/MapServer/exts/WatershedSOE/",
			retrieveLayersOperation: "describeLayers",
			createWatershedOperation: "createWatershed",
			AvailableExtractionParams: {}		
			,
			DefaultOutputParams: {
				// fields that will always be returned by the SOE regardless
				area: {
					name: "Catchment area",
					type: "Literal",
					responsePrefix: "CATCH_AREA"
				},
				searchId: {
					name: "Search Identifier",
					type: "Identifier",
					responsePrefix: "SEARCH_ID"
				}
			},
			FixedInputParams: {
				IDParamName: "search_id",
				LocationParamName: "location",
				ExtentParamName: "extent",
				SRParamName: "input_wkid",
				OutputFormatParamName: "extractToPolygonAttributes"
			}
		}
	},
	openaccess:{
		racquelSiteService: {
			URL: "http://wlwater.ceh.ac.uk/ArcGIS/rest/services/RACQUEL/RACQUEL_At_Site_Core/MapServer",
			Layers: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
			LayerOption: esri.tasks.IdentifyParameters.LAYER_OPTION_ALL
		},
		// The service giving access to the river and nodes data - not the network / routing service
		// Must include river lines, nodes, sources, mouths
		// Assumptions: geometry field in riverlines is called "SHAPE", snapping distance for selecting a 
		// river is 250m. If required, set them here and update routeSearch code to pull them out
		racquelRiversDataService: {
			URL: "http://wlwater.ceh.ac.uk/ArcGIS/rest/services/RACQUEL/RACQUEL_River_Data/MapServer",
			Nodes: {
				LayerNum: 2,
				// database table name of nodes layer, for use in where clause of join queries
				TableName: "NRFA_SDE.IRN_NODES",
				IdField: "NODEID_FULL",
				NodeSourceField: "SOURCENODE_FULL", // matches to IdField of Sources table for join queries
				NodeMouthField: "MOUTHNODE_FULL" // likewise
			},
			Sources: {
				LayerNum: 0,
				TableName: "", // not required
				IdField: "SOURCEID_FULL" // name of the identifier field in sourcelayer that matches with nodes table
			},
			Mouths: {
				LayerNum: 3,
				TableName: "",
				IdField: "MOUTHID_FULL"
			},
			TidalMouths: {
				LayerNum: 1,
				TableName: "",
				IdField: "TIDEID_FULL"
			},
			RiverLines: {
				LayerNum: 4,
				FromField: "FNODE_FULL", // matches node id definied in IdField of Nodes
				ToField: "TNODE_FULL", // likewise
				DisplayName: "OS_NAME",
				FetchFields: ["OS_NAME", "LENGTH", "STRAHLER", "SHREVE", "WORK_", "WORKTYPE", "FNODE_FULL", "TNODE_FULL"]
			}
		},
		racquelRouteService: {
			URL: "http://wlwater.ceh.ac.uk/ArcGIS/rest/services/RACQUEL/RACQUEL_Routing_Core/NAServer/IRN_Route_Layer"
		},
		
			
		racquelCatchmentService: {
			URL: "http://wlwater.ceh.ac.uk/ArcGIS/rest/services/RACQUEL/RACQUEL_Catchment_Open/MapServer/exts/WatershedSOE/",
			retrieveLayersOperation: "describeLayers",
			createWatershedOperation: "createWatershed",
			DefaultOutputParams: {
				// fields that will always be returned by the SOE regardless
				area: {
					name: "Catchment area",
					type: "Literal",
					responsePrefix: "CATCH_AREA"
				},
				searchId: {
					name: "Search Identifier",
					type: "Identifier",
					responsePrefix: "SEARCH_ID"
				}
			},
			FixedInputParams: {
				IDParamName: "search_id",
				LocationParamName: "location",
				ExtentParamName: "extent",
				SRParamName: "input_wkid",
				OutputFormatParamName: "extractToPolygonAttributes"
			}
		}
		
	}
});