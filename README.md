##Who
RACQUEL is the River and Catchment Query and Extraction Layer. It was developed by Harry Gibson, when I worked at CEH Wallingford.

It is no longer in use, so far as I know, but the code is left here as an archive / example of a relatively advanced application written for the ESRI Javascript API 
that takes advantage of some advanced features like Server Object Extensions, browser-based binary data processing, and modular code design (using the old Dojo 
syntax, not the modern AMD style)

##What
RACQUEL is a web application for the ESRI Javascript API, that provides a browser based interface for interacting with some of CEH's key hydrological datasets served through ArcGIS Server - although it could also be applied to other datasets.

It is designed to allow quick access to these datasets and to provide a rapid way of performing commonly-used tasks such as finding the catchment for a point on a river network.

RACQUEL enables three types of search for a given search location:

* query of data at a search location (similar to an Identify tool in a GIS)
* network searches along a river network to find the source and mouth points of the river you're on, and the distance along the river to them (like driving directions in google maps, but with rivers instead of roads)
* extraction of a drainage catchment (watershed) above the search location, along with a spatial summary of this catchment.

All of these searches can be performed in interactive mode or in batch mode from an input CSV file of sites.

With a suitable browser (ideally Google Chrome, though FF and IE normally work), results can be exported to shapefiles for further analysis in a GIS of your choice.

##How
RACQUEL is implemented as a Dojo Dijit which provides a toolbar. This toolbar can be added to a web page containing an ESRI Javascript Map and this will enable the search functionality described above on the page in question. The layout and content of this map are not critical and the test host pages here are only tests. Technically RACQUEL doesn't actually require a map at all in order to run searches from a CSV file, but that wouldn't be much fun.

* Site based searches simply use an Identify task running on ArcGIS Server to query a bunch of layers in a map service.
* Route searches use a network analyst task running on ArcGIS server. The network dataset behind this is a rivers network.
* Catchment searches use a Server Object Extension that I have written for ArcGIS server to calculate the catchment and extract information from other datasets based on it. This SOE has its own site at https://github.com/harry-gibson/watershed-soe. The SOE is still at prototype stage!

The location of the services used is currently configured in a single file so RACQUEL should be relatively feasible to set up with your own data and services.
Export to shapefile uses a separate javascript library which has its own site at https://github.com/harry-gibson/js2shapefile/. This uses HTML5 binary data manipulation to create the shapefile natively in the web browser.

##Where
RACQUEL was written against ArcGIS services that were only available internally at CEH Wallingford - RACQUEL code is freely available but the datasets it queries are not. Therefore you can't directly run RACQUEL searches with the code as it is, unless you are at CEH. However RACQUEL has been written in such a way that it should be adaptable to other ArcGIS Server service locations and datasets. It would just be a matter of setting up suitable services on an instance of ArcGIS server and modifying RACQUEL code to match.
