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

<http://mpeg.org/action2>
        a               mvco:distribute ;
        rdfs:label      "Service distributes a song" ;
        mvco:actedBy    <http://mpeg.org/StreamingService> ;
        mvco:actedOver  <http://mpeg.org/Song> .

<http://mpeg.org/Aggregator>
        a           mco-core:Party ;
        rdfs:label  "AGGREGATOR" .

<http://mpeg.org/StreamingService>
        a           mvco:Distributor , mco-core:Party ;
        rdfs:label  "STREAMING SERVICE" .

<http://mpeg.org/pay7>
        a                             mco-pane:Payment ;
        rdfs:label                    "Payment" ;
        mvco:actedBy                  <http://mpeg.org/MechanicalLicenseAgent> ;
        mco-pane:hasBeneficiary       <http://mpeg.org/Publisher> ;
        mco-pane:hasIncomePercentage  50 .

<http://mpeg.org/pay1>
        a                        mco-pane:Payment ;
        rdfs:label               "Payment" ;
        mvco:actedBy             <http://mpeg.org/Consumer> ;
        mco-pane:hasAmount       19 ;
        mco-pane:hasBeneficiary  <http://mpeg.org/StreamingService> ;
        mco-pane:hasCurency      "EUR" .

<http://mpeg.org/obligation8>
        a                         mco-core:Obligation ;
        rdfs:label                "Publisher must pay 10-50% to Author" ;
        mco-core:issuedIn         <http://mpeg.org/contract3> ;
        mvco:issuedBy             <http://mpeg.org/StreamingService> ;
        mco-core:obligatesAction  <http://mpeg.org/pay6> .

<http://mpeg.org/action1>
        a               mco-rele:Play ;
        rdfs:label      "Consumer plays a song" ;
        mvco:actedBy    <http://mpeg.org/Consumer> ;
        mvco:actedOver  <http://mpeg.org/Song> .

<http://mpeg.org/Song>
        a           mvco:Work ;
        rdfs:label  "SONG" .

<http://mpeg.org/PerformingRighthsOrganisation>
        a           mco-core:Party ;
        rdfs:label  "PERFORMING RIGHTS ORGANISATION" .

<http://mpeg.org/pay6>
        a                             mco-pane:Payment ;
        rdfs:label                    "Payment" ;
        mvco:actedBy                  <http://mpeg.org/Publisher> ;
        mco-pane:hasBeneficiary       <http://mpeg.org/Author> ;
        mco-pane:hasIncomePercentage  10 .

<http://mpeg.org/permission1>
        a                       mvco:Permission ;
        rdfs:label              "Consumer can play a song" ;
        mco-core:issuedIn       <http://mpeg.org/contract3> ;
        mvco:issuedBy           <http://mpeg.org/StreamingService> ;
        mco-core:permitsAction  <http://mpeg.org/action1> .

<http://mpeg.org/permission2>
        a                       mvco:Permission ;
        rdfs:label              "Publisher authorises streaming service" ;
        mco-core:issuedIn       <http://mpeg.org/contract3> ;
        mvco:issuedBy           <http://mpeg.org/Publisher> ;
        mco-core:permitsAction  <http://mpeg.org/action2> .

<http://mpeg.org/permission3>
        a                       mvco:Permission ;
        rdfs:label              "Record label authorises streaming service" ;
        mco-core:issuedIn       <http://mpeg.org/contract3> ;
        mvco:issuedBy           <http://mpeg.org/Aggregator> ;
        mco-core:permitsAction  <http://mpeg.org/action2> .

<http://mpeg.org/obligation1>
        a                         mco-core:Obligation ;
        rdfs:label                "Publisher provide a song to streaming" ;
        mco-core:issuedIn         <http://mpeg.org/contract3> ;
        mvco:issuedBy             <http://mpeg.org/Publisher> ;
        mco-core:obligatesAction  <http://mpeg.org/action5> .

<http://mpeg.org/obligation7>
        a                         mco-core:Obligation ;
        rdfs:label                "Aggregator must pay the author" ;
        mco-core:issuedIn         <http://mpeg.org/contract3> ;
        mvco:issuedBy             <http://mpeg.org/StreamingService> ;
        mco-core:obligatesAction  <http://mpeg.org/pay5> .

<http://mpeg.org/contract3>
        a                  mco-core:Contract ;
        rdfs:label         "CONTRACT 3 - On demand stream - Self-released. For artist who own their sound recording copyrights and use services like CD Baby or TuneCore" ;
        mco-core:hasParty  <http://mpeg.org/PerformingRighthsOrganisation> , <http://mpeg.org/Aggregator> , <http://mpeg.org/Author> , <http://mpeg.org/Publisher> , <http://mpeg.org/MechanicalLicenseAgent> , <http://mpeg.org/StreamingService> , <http://mpeg.org/Consumer> .
        
<http://mpeg.org/Author>
        a           mco-core:Party ;
        rdfs:label  "AUTHOR/BAND" .

<http://mpeg.org/pay5>
        a                             mco-pane:Payment ;
        rdfs:label                    "Payment" ;
        mvco:actedBy                  <http://mpeg.org/Aggregator> ;
        mco-pane:hasBeneficiary       <http://mpeg.org/Author> ;
        mco-pane:hasIncomePercentage  90 .

<http://mpeg.org/obligation6>
        a                         mco-core:Obligation ;
        rdfs:label                "Streaming service must pay 50% to Aggregator" ;
        mco-core:issuedIn         <http://mpeg.org/contract3> ;
        mvco:issuedBy             <http://mpeg.org/StreamingService> ;
        mco-core:obligatesAction  <http://mpeg.org/pay4> .

<http://mpeg.org/action5>
        a               <mco-core:Provide> ;
        rdfs:label      "Streaming provides a song" ;
        mvco:actedBy    <http://mpeg.org/Publisher> ;
        mvco:actedOver  <http://mpeg.org/Song> .

<http://mpeg.org/Publisher>
        a           mco-core:Party ;
        rdfs:label  "PUBLISHER" .

<http://mpeg.org/pay4>
        a                             mco-pane:Payment ;
        rdfs:label                    "Payment" ;
        mvco:actedBy                  <http://mpeg.org/StreamingService> ;
        mco-pane:hasBeneficiary       <http://mpeg.org/Aggregator> ;
        mco-pane:hasIncomePercentage  50 .

<http://mpeg.org/obligation5>
        a                         mco-core:Obligation ;
        rdfs:label                "Streaming service pays 1% to PRO" ;
        mco-core:issuedIn         <http://mpeg.org/contract3> ;
        mvco:issuedBy             <http://mpeg.org/StreamingService> ;
        mco-core:obligatesAction  <http://mpeg.org/pay3> .

<http://mpeg.org/action4>
        a               mvco:distribute ;
        rdfs:label      "Record label to distribute" ;
        mvco:actedBy    <http://mpeg.org/Aggregator> ;
        mvco:actedOver  <http://mpeg.org/Song> .

<http://mpeg.org/Consumer>
        a           mvco:EndUser , mco-core:Party ;
        rdfs:label  "CONSUMER" .

<http://mpeg.org/pay3>
        a                             mco-pane:Payment ;
        rdfs:label                    "Payment" ;
        mvco:actedBy                  <http://mpeg.org/StreamingService> ;
        mco-pane:hasBeneficiary       <http://mpeg.org/PerformingRighthsOrganisation> ;
        mco-pane:hasIncomePercentage  1 .

<http://mpeg.org/permission4>
        a                       mvco:Permission ;
        rdfs:label              "Author authorises aggregator to distribute" ;
        mco-core:issuedIn       <http://mpeg.org/contract3> ;
        mvco:issuedBy           <http://mpeg.org/Author> ;
        mco-core:permitsAction  <http://mpeg.org/action4> .

<http://mpeg.org/obligation4>
        a                         mco-core:Obligation ;
        rdfs:label                "Streaming service pays 10% to publisher" ;
        mco-core:issuedIn         <http://mpeg.org/contract3> ;
        mvco:issuedBy             <http://mpeg.org/StreamingService> ;
        mco-core:obligatesAction  <http://mpeg.org/pay2> .

<http://mpeg.org/pay2>
        a                             mco-pane:Payment ;
        rdfs:label                    "Payment" ;
        mvco:actedBy                  <http://mpeg.org/StreamingService> ;
        mco-pane:hasBeneficiary       <http://mpeg.org/MechanicalLicenseAgent> ;
        mco-pane:hasIncomePercentage  10 .

<http://mpeg.org/obligation3>
        a                         mco-core:Obligation ;
        rdfs:label                "Consumer pays a fixed rate" ;
        mco-core:issuedIn         <http://mpeg.org/contract3> ;
        mvco:issuedBy             <http://mpeg.org/Consumer> ;
        mco-core:obligatesAction  <http://mpeg.org/pay1> .

<http://mpeg.org/obligation9>
        a                         mco-core:Obligation ;
        rdfs:label                "Mechanical License Agent must pay to Publisher" ;
        mco-core:issuedIn         <http://mpeg.org/contract3> ;
        mvco:issuedBy             <http://mpeg.org/StreamingService> ;
        mco-core:obligatesAction  <http://mpeg.org/pay7> .

<http://mpeg.org/MechanicalLicenseAgent>
        a           mvco:Instantiator , mco-core:Party ;
        rdfs:label  "MECHANICAL LICENSE AGENT" .
`;
