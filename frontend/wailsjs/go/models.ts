export namespace main {
	
	export class Device {
	    name: string;
	    indoorTemp: number;
	    outdoorTemp: number;
	    power: boolean;
	    setTemp: number;
	
	    static createFrom(source: any = {}) {
	        return new Device(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.indoorTemp = source["indoorTemp"];
	        this.outdoorTemp = source["outdoorTemp"];
	        this.power = source["power"];
	        this.setTemp = source["setTemp"];
	    }
	}

}

