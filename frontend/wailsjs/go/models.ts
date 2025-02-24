export namespace comfortcloud {
	
	export class Parameters {
	    operate: number;
	    operationMode: number;
	    temperatureSet: number;
	    fanSpeed: number;
	    fanAutoMode: number;
	    airSwingLR: number;
	    airSwingUD: number;
	    ecoFunctionData: number;
	    ecoMode: number;
	    ecoNavi: number;
	    nanoe: number;
	    iAuto: number;
	    airDirection: number;
	    lastSettingMode: number;
	    insideCleaning: number;
	    fireplace: number;
	    insideTemperature: number;
	    outTemperature: number;
	    airQuality: number;
	
	    static createFrom(source: any = {}) {
	        return new Parameters(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.operate = source["operate"];
	        this.operationMode = source["operationMode"];
	        this.temperatureSet = source["temperatureSet"];
	        this.fanSpeed = source["fanSpeed"];
	        this.fanAutoMode = source["fanAutoMode"];
	        this.airSwingLR = source["airSwingLR"];
	        this.airSwingUD = source["airSwingUD"];
	        this.ecoFunctionData = source["ecoFunctionData"];
	        this.ecoMode = source["ecoMode"];
	        this.ecoNavi = source["ecoNavi"];
	        this.nanoe = source["nanoe"];
	        this.iAuto = source["iAuto"];
	        this.airDirection = source["airDirection"];
	        this.lastSettingMode = source["lastSettingMode"];
	        this.insideCleaning = source["insideCleaning"];
	        this.fireplace = source["fireplace"];
	        this.insideTemperature = source["insideTemperature"];
	        this.outTemperature = source["outTemperature"];
	        this.airQuality = source["airQuality"];
	    }
	}
	export class ModeAvl {
	    autoMode: number;
	
	    static createFrom(source: any = {}) {
	        return new ModeAvl(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.autoMode = source["autoMode"];
	    }
	}
	export class Device {
	    deviceGuid: string;
	    deviceType: string;
	    deviceName: string;
	    permission: number;
	    temperatureUnit: number;
	    summerHouse: number;
	    nanoeStandAlone: boolean;
	    autoMode: boolean;
	    modeAvlList: ModeAvl;
	    parameters: Parameters;
	    deviceModuleNumber: string;
	    deviceHashGuid: string;
	    modelVersion: number;
	    coordinableFlg: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Device(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.deviceGuid = source["deviceGuid"];
	        this.deviceType = source["deviceType"];
	        this.deviceName = source["deviceName"];
	        this.permission = source["permission"];
	        this.temperatureUnit = source["temperatureUnit"];
	        this.summerHouse = source["summerHouse"];
	        this.nanoeStandAlone = source["nanoeStandAlone"];
	        this.autoMode = source["autoMode"];
	        this.modeAvlList = this.convertValues(source["modeAvlList"], ModeAvl);
	        this.parameters = this.convertValues(source["parameters"], Parameters);
	        this.deviceModuleNumber = source["deviceModuleNumber"];
	        this.deviceHashGuid = source["deviceHashGuid"];
	        this.modelVersion = source["modelVersion"];
	        this.coordinableFlg = source["coordinableFlg"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	

}

