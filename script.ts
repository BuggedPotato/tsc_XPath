
async function getData<T>( mode : string, voivodeshipID? : string ) : Promise<T>
{
    const headers : HeadersInit = { "Content-Type": 'application/x-www-form-urlencoded' };
        const body : BodyInit = "data=" + JSON.stringify( { mode: mode, void_id: voivodeshipID } );
        return fetch(
            "data.php",
            { method: "post", body, headers })
            .then( response =>{
                if( !response.ok )
                    throw new Error( response.statusText );
                return response.json() as Promise<T>;
            } )
            .then( data =>{ 
                // console.log( data );
                return data } );
}

function createTable( arr : Array<any>, dataType : string, voivodeshipName? : string ) : HTMLTableElement
{
    let table : HTMLTableElement = document.createElement( "table" );
    table.id = "table";
    let thead : HTMLElement = document.createElement( "thead" );
    let row : HTMLTableRowElement = document.createElement( "tr" );
    let td : HTMLTableCellElement = document.createElement( "td" );

    document.getElementById( "goBack" )!.style.display = dataType == "c" ? "flex" : "none";
    if( dataType == "v" )
    {
        arr.map( (obj, i)=>{
            obj.NAZWA = obj.NAZWA.toLowerCase();
        } );
    }


    td = document.createElement( "td" ); 
    td.innerText = "Nr";
    row = document.createElement( "tr" );
    row.appendChild( td );
    td = document.createElement( "td" );
    let str : string = voivodeshipName?.substring(0, voivodeshipName?.length-1) + "m";
    td.innerText = "Nazwa " + (dataType == "v" ? "województwa" : "miasta w woj. " + str);
    row.appendChild( td );
    thead.appendChild( row );
    table.appendChild( thead );
    
    console.log( arr );
    let tbody = document.createElement( "tbody" );

    arr.map( (obj, i)=>{
        let row : HTMLTableRowElement = document.createElement( "tr" );
        let td : HTMLTableCellElement = document.createElement( "td" );
        td.innerText = (i + 1).toString();
        row.appendChild( td );

        td = document.createElement( "td" );
        let name : string = obj.NAZWA;
        td.innerText = name;
        if( dataType == "v" )
        {
            td.addEventListener( "click", async ()=>{
                refreshTable( createTable( await getData( "cities", obj.WOJ ), "c", obj.NAZWA ) )
            } );
        }

        row.appendChild( td );
        tbody.appendChild( row );
    } );
    table.appendChild( tbody );

    return table;
}

function refreshTable( newTable : HTMLTableElement ) : void
{
    let t : HTMLTableElement = document.getElementById( "table" ) as HTMLTableElement;
    t.parentNode?.removeChild( t );
    document.body.appendChild( newTable );
}

async function main() : Promise<any>
{
    let data : any[] = await getData( "voivodeships" );

    let button : HTMLButtonElement = document.createElement( "button" );
        button.id = "goBack";
        button.type = "button";
        button.innerText = "Powrót";
        button.addEventListener( "click", async ()=>{
            refreshTable( createTable( await getData( "voivodeships" ), "v" ) )
        } );
    document.body.appendChild( button );

    document.body.appendChild( createTable(data, "v") ); // v - voivodeships, c - cities
}