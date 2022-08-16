/* eslint-disable max-len */
import { XMLType, ContractGenerator } from '../common';

const celApi: ContractGenerator<XMLType> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async generateContractualObjects(input: XMLType): Promise<any> {
    console.log({ input });
    const r = await fetch('https://scm.linkeddata.es/api/parser/cel', {
      method: 'POST',
      headers: {
        'Content-Type': 'plain/text',
      },
      // body: inputXML,
      body: `
      <?xml version="1.0" encoding="UTF-8"?>
      <cel-core:Contract
        xmlns:cel-core="urn:mpeg:mpeg21:cel:core:2015"
        xmlns:cel-ipre="urn:mpeg:mpeg21:cel:ipre:2015"
        xmlns:cel-pane="urn:mpeg:mpeg21:cel:pane:2015"
        xmlns:cel-rele="urn:mpeg:mpeg21:cel:rele:2015"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:dii="urn:mpeg:mpeg21:2002:01-DII-NS"
        xmlns:dsig="http://www.w3.org/2000/09/xmldsig#"
        xmlns:rel-r="urn:mpeg:mpeg21:2003:01-REL-R-NS"
        xmlns:rel-mx="urn:mpeg:mpeg21:2003:01-REL-MX-NS" 
        xsi:schemaLocation="urn:mpeg:mpeg21:cel:core:2015 cel-core.xsd      urn:mpeg:mpeg21:cel:ipre:2015 cel-ipre.xsd      urn:mpeg:mpeg21:cel:pane:2015 cel-pane.xsd     urn:mpeg:mpeg21:cel:rele:2015 cel-rele.xsd     urn:mpeg:mpeg21:2003:01-REL-R-NS http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-21_schema_files/rel-r/rel-sx.xsd     urn:mpeg:mpeg21:2003:01-REL-MX-NS http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-21_schema_files/rel-r/rel-mx.xsd" 
        contractId="Use Case Contract Download No Label">
        <cel-core:TextVersion>
          <!-- TEXT OF THE ORIGINAL NARRATIVE CONTRACT TO BE INSERTED HERE-->
          <!--        
              Right: Download
              Source of revenues – Download sale companies
              Receivers:
                  SR (Sound recording) licensed use of sound recording (Aggregator)
                      - 91 - 100% artist / band 
                      (In some cases) - 9,1 ç/track - Mechanical reproduction – Publisher -> Songwriter, only if performer recorded + released songs from others
                      
              Licensee – Downloading companies
              Licensor – Aggregator
              Revenues –  SR (Sound Recording) -> Artist / Band
                                  Record + release - Publisher -> Songwriter 
              
              High-level description: 
              Artists/bands make a deal with an aggregator, which, in turn, make a deal with downloading company to sell 
              works. Then, revenues are mainly given to artists / bands and, in some cases, a specific amount is given to 
              publishers and songwriters.
          
              -->
        </cel-core:TextVersion>
        <cel-core:Metadata>
          <cel-core:SimpleDC>
            <dc:title>Use Case Contract Download No Label</dc:title>
            <dc:date>2020-05-20</dc:date>
            <dc:creator>UPC:DMAG</dc:creator>
            <dc:identifier>urn:mpeg:mpeg21:cel:2020:download_no_label</dc:identifier>
          </cel-core:SimpleDC>
        </cel-core:Metadata>
        <cel-core:Party id="licensor">
          <cel-core:Person>
            <cel-core:Name>AG</cel-core:Name>
            <cel-core:Details>Aggregator AG</cel-core:Details>
          </cel-core:Person>
        </cel-core:Party>
        <cel-core:Party id="licensee">
          <cel-core:Person>
            <cel-core:Name>DS</cel-core:Name>
            <cel-core:Details>Digital Sale Company DS</cel-core:Details>
          </cel-core:Person>
        </cel-core:Party>
        <cel-core:Body>
          <cel-core:OperativePart>
            <cel-core:Statement>
              <cel-core:Subject partyRef="licensor"/>
              <cel-core:Act>
                <rel-r:possessProperty/>
              </cel-core:Act>
              <cel-core:Object>
                <cel-core:Item name="SR">
                  <dii:Identifier>isan:1234sra</dii:Identifier>
                </cel-core:Item>
              </cel-core:Object>
            </cel-core:Statement>
            <!-- Permission for selling a song -->
            <cel-ipre:Permission id="P1">
              <!--isExclusive="true"-->
              <cel-core:Subject partyRef="licensee"/>
              <cel-core:Act>
                <!--cel-ipre:PublicCommunication/-->
                <cel-core:Provide recipients="licensee"/>
              </cel-core:Act>
              <cel-core:Object>
                <cel-core:Item name="SR">
                  <dii:Identifier>isan:1234sra</dii:Identifier>
                </cel-core:Item>
              </cel-core:Object>
              <cel-core:Constraint>
                <cel-ipre:DeliveryModality href="urn:mpeg:mpeg21:cel:ipre:2015/DeliveryModality#OnDemandDownload"/>
              </cel-core:Constraint>
              <cel-core:Issuer partyRef="licensor"/>
            </cel-ipre:Permission>
            <cel-core:Obligation id="O1">
              <cel-core:Subject partyRef="licensor"/>
              <cel-core:Act>
                <!-- X = 2 for the example. This value will change depending on the conditions -->
                <cel-pane:Payment incomePercentage="70" amount="2">
                  <cel-pane:Beneficiary partyRef="licensor"/>
                </cel-pane:Payment>
              </cel-core:Act>
              <cel-core:Object>
                <cel-core:Item name="SR">
                  <dii:Identifier>isan:1234sra</dii:Identifier>
                </cel-core:Item>
              </cel-core:Object>
              <cel-core:Issuer partyRef="licensee"/>
            </cel-core:Obligation>
          </cel-core:OperativePart>
        </cel-core:Body>
      </cel-core:Contract>
      `,
    });

    return r.json();
  },
};

export default celApi;
