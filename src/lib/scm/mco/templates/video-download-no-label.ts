/* eslint-disable max-len */
export default `
@prefix mco-ipre: <urn:mpeg:mpeg21:mco:ipre:2012#> .
@prefix owl:   <http://www.w3.org/2002/07/owl#> .
@prefix mvco:  <http://purl.oclc.org/NET/mvco.owl#> .
@prefix xsd:   <http://www.w3.org/2001/XMLSchema#> .
@prefix mco-core: <urn:mpeg:mpeg21:mco:core:2012#> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
@prefix mco-pane: <urn:mpeg:mpeg21:mco:pane:2015#> .
@prefix mco-rele: <urn:mpeg:mpeg21:mco:rele:2015#> .

<http://mpeg.org/contract6>
        a                  mco-core:Contract ;
        rdfs:label         "CONTRACT 6 - Digital sale - For artists who own their sound recording copyrights and use services like CD Baby or TuneCore." ;
        mco-core:hasParty  <http://mpeg.org/DigitalSale> , <http://mpeg.org/VideoCreator> , <http://mpeg.org/Consumer> .

<http://mpeg.org/action2>
        a               mvco:distribute ;
        rdfs:label      "Digital Sale distributes and publish a media" ;
        mvco:actedBy    <http://mpeg.org/DigitalSale> ;
        mvco:actedOver  <http://mpeg.org/Video> .

<http://mpeg.org/VideoCreator>
        a           mco-core:Party ;
        rdfs:label  "VIDEO CREATOR" .

<http://mpeg.org/pay6>
        a                             mco-pane:Payment ;
        rdfs:label                    "Payment" ;
        mvco:actedBy                  <http://mpeg.org/DigitalSale> ;
        mco-pane:hasBeneficiary       <http://mpeg.org/VideoCreator> ;
        mco-pane:hasIncomePercentage  70 .

<http://mpeg.org/obligation8>
        a                         mco-core:Obligation ;
        rdfs:label                "Record label must pay 70% to author" ;
        mco-core:issuedIn         <http://mpeg.org/contract6> ;
        mvco:issuedBy             <http://mpeg.org/DigitalSale> ;
        mco-core:obligatesAction  <http://mpeg.org/pay6> .

<http://mpeg.org/pay1>
        a                        mco-pane:Payment ;
        rdfs:label               "Payment" ;
        mvco:actedBy             <http://mpeg.org/Consumer> ;
        mco-pane:hasAmount       100 ;
        mco-pane:hasBeneficiary  <http://mpeg.org/DigitalSale> ;
        mco-pane:hasCurency      "ELA" .

<http://mpeg.org/pay7>
        a                        mco-pane:Payment ;
        rdfs:label               "Payment" ;
        mvco:actedBy             <http://mpeg.org/DigitalSale> ;
        mco-pane:hasAmount       70 ;
        mco-pane:hasBeneficiary  <http://mpeg.org/VideoCreator> ;
        mco-pane:hasCurency      "ELA" .

<http://mpeg.org/action1>
        a               mco-rele:Play ;
        rdfs:label      "Consumer plays a song" ;
        mvco:actedBy    <http://mpeg.org/Consumer> ;
        mvco:actedOver  <http://mpeg.org/Video> .

<http://mpeg.org/Video>
        a           mvco:Work ;
        rdfs:label  "VIDEO" .

<http://mpeg.org/permission1>
        a                       mvco:Permission ;
        rdfs:label              "Consumer can play a song" ;
        mco-core:issuedIn       <http://mpeg.org/contract6> ;
        mvco:issuedBy           <http://mpeg.org/DigitalSale> ;
        mco-core:permitsAction  <http://mpeg.org/action1> .

<http://mpeg.org/Consumer>
        a           mvco:EndUser , mco-core:Party ;
        rdfs:label  "CONSUMER" .

<http://mpeg.org/DigitalSale>
        a           mvco:Distributor , mco-core:Party ;
        rdfs:label  "DIGITAL SALE" .

`;
