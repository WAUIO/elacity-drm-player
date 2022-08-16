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
        rdfs:label      "Digital Sale distributes a song" ;
        mvco:actedBy    <http://mpeg.org/DigitalSale> ;
        mvco:actedOver  <http://mpeg.org/Song> .

<http://mpeg.org/SongWriter>
        a           mco-core:Party ;
        rdfs:label  "SONG WRITER" .

<http://mpeg.org/obligation8>
        a                         mco-core:Obligation ;
        rdfs:label                "Record label must pay 50% to artist/band" ;
        mco-core:issuedIn         <http://mpeg.org/contract4> ;
        mvco:issuedBy             <http://mpeg.org/DigitalSale> ;
        mco-core:obligatesAction  <http://mpeg.org/pay6> .

<http://mpeg.org/pay1>
        a                        mco-pane:Payment ;
        rdfs:label               "Payment" ;
        mvco:actedBy             <http://mpeg.org/Consumer> ;
        mco-pane:hasAmount       1 ;
        mco-pane:hasBeneficiary  <http://mpeg.org/DigitalSale> ;
        mco-pane:hasCurency      "USD" .

<http://mpeg.org/obligation2>
        a                         mco-core:Obligation ;
        rdfs:label                "Artist to provide a song to record label" ;
        mco-core:issuedIn         <http://mpeg.org/contract4> ;
        mvco:issuedBy             <http://mpeg.org/RecordLabel> ;
        mco-core:obligatesAction  <http://mpeg.org/action3> .

<http://mpeg.org/pay7>
        a                        mco-pane:Payment ;
        rdfs:label               "Payment" ;
        mvco:actedBy             <http://mpeg.org/Publisher> ;
        mco-pane:hasAmount       2 ;
        mco-pane:hasBeneficiary  <http://mpeg.org/SongWriter> ;
        mco-pane:hasCurency      "USD cents" .

<http://mpeg.org/action1>
        a               mco-rele:Play ;
        rdfs:label      "Consumer plays a song" ;
        mvco:actedBy    <http://mpeg.org/Consumer> ;
        mvco:actedOver  <http://mpeg.org/Song> .

<http://mpeg.org/RecordLabel>
        a           mvco:Producer , mco-core:Party ;
        rdfs:label  "RECORD LABEL" .

<http://mpeg.org/Song>
        a           mvco:Work ;
        rdfs:label  "SONG" .

<http://mpeg.org/pay6>
        a                             mco-pane:Payment ;
        rdfs:label                    "Payment" ;
        mvco:actedBy                  <http://mpeg.org/RecordLabel> ;
        mco-pane:hasBeneficiary       <http://mpeg.org/ArtistBand> ;
        mco-pane:hasIncomePercentage  50 .

<http://mpeg.org/ArtistBand>
        a           mvco:Creator , mco-core:Party ;
        rdfs:label  "ARTIST / BAND" .

<http://mpeg.org/permission1>
        a                       mvco:Permission ;
        rdfs:label              "Consumer can play a song" ;
        mco-core:issuedIn       <http://mpeg.org/contract4> ;
        mvco:issuedBy           <http://mpeg.org/DigitalSale> ;
        mco-core:permitsAction  <http://mpeg.org/action1> .

<http://mpeg.org/permission2>
        a                       mvco:Permission ;
        rdfs:label              "Record label authorises digital sale to sell a song" ;
        mco-core:issuedIn       <http://mpeg.org/contract4> ;
        mvco:issuedBy           <http://mpeg.org/RecordLabel> ;
        mco-core:permitsAction  <http://mpeg.org/action2> .

<http://mpeg.org/permission3>
        a                       mvco:Permission ;
        rdfs:label              "Publisher authorises the digital sale" ;
        mco-core:issuedIn       <http://mpeg.org/contract4> ;
        mvco:issuedBy           <http://mpeg.org/Publisher> ;
        mco-core:permitsAction  <http://mpeg.org/action2> .

<http://mpeg.org/obligation1>
        a                         mco-core:Obligation ;
        rdfs:label                "Record label provide a song to digital sale" ;
        mco-core:issuedIn         <http://mpeg.org/contract4> ;
        mvco:issuedBy             <http://mpeg.org/Publisher> ;
        mco-core:obligatesAction  <http://mpeg.org/action5> .

<http://mpeg.org/obligation7>
        a                         mco-core:Obligation ;
        rdfs:label                "Publisher pays songwriters" ;
        mco-core:issuedIn         <http://mpeg.org/contract4> ;
        mvco:issuedBy             <http://mpeg.org/RecordLabel> ;
        mco-core:obligatesAction  <http://mpeg.org/pay7> .

<http://mpeg.org/action5>
        a               <mco-core:Provide> ;
        rdfs:label      "Streaming provides a song" ;
        mvco:actedBy    <http://mpeg.org/RecordLabel> ;
        mvco:actedOver  <http://mpeg.org/Song> .

<http://mpeg.org/Publisher>
        a           mco-core:Party ;
        rdfs:label  "PUBLISHER" .

<http://mpeg.org/pay4>
        a                             mco-pane:Payment ;
        rdfs:label                    "Payment" ;
        mvco:actedBy                  <http://mpeg.org/DigitalSale> ;
        mco-pane:hasBeneficiary       <http://mpeg.org/RecordLabel> ;
        mco-pane:hasIncomePercentage  50 .

<http://mpeg.org/Musicians>
        a           mvco:Instantiator , mco-core:Party ;
        rdfs:label  "MUSICIANS" .

<http://mpeg.org/action4>
        a               mvco:distribute ;
        rdfs:label      "Record label to distribute" ;
        mvco:actedBy    <http://mpeg.org/RecordLabel> ;
        mvco:actedOver  <http://mpeg.org/Song> .

<http://mpeg.org/Consumer>
        a           mvco:EndUser , mco-core:Party ;
        rdfs:label  "CONSUMER" .

<http://mpeg.org/pay3>
        a                             mco-pane:Payment ;
        rdfs:label                    "Payment" ;
        mvco:actedBy                  <http://mpeg.org/RecordLabel> ;
        mco-pane:hasBeneficiary       <http://mpeg.org/Musicians> ;
        mco-pane:hasIncomePercentage  1 .

<http://mpeg.org/permission4>
        a                       mvco:Permission ;
        rdfs:label              "Artist/Band authorises record label to distribute" ;
        mco-core:issuedIn       <http://mpeg.org/contract4> ;
        mvco:issuedBy           <http://mpeg.org/ArtistBand> ;
        mco-core:permitsAction  <http://mpeg.org/action4> .

<http://mpeg.org/obligation4>
        a                         mco-core:Obligation ;
        rdfs:label                "Rercord label pays 9 USD cents to publisher" ;
        mco-core:issuedIn         <http://mpeg.org/contract4> ;
        mvco:issuedBy             <http://mpeg.org/RecordLabel> ;
        mco-core:obligatesAction  <http://mpeg.org/pay2> .

<http://mpeg.org/obligation5>
        a                         mco-core:Obligation ;
        rdfs:label                "Record Label pays 1% to Musicians" ;
        mco-core:issuedIn         <http://mpeg.org/contract4> ;
        mvco:issuedBy             <http://mpeg.org/RecordLabel> ;
        mco-core:obligatesAction  <http://mpeg.org/pay3> .

<http://mpeg.org/obligation6>
        a                         mco-core:Obligation ;
        rdfs:label                "Digital sale must pay to Record Label" ;
        mco-core:issuedIn         <http://mpeg.org/contract4> ;
        mvco:issuedBy             <http://mpeg.org/DigitalSale> ;
        mco-core:obligatesAction  <http://mpeg.org/pay4> .

<http://mpeg.org/action3>
        a               <mco-core:Provide> ;
        rdfs:label      "Record label provides a song" ;
        mvco:actedBy    <http://mpeg.org/ArtistBand> ;
        mvco:actedOver  <http://mpeg.org/Song> .

<http://mpeg.org/DigitalSale>
        a           mvco:Distributor , mco-core:Party ;
        rdfs:label  "DIGITAL SALE" .

<http://mpeg.org/pay2>
        a                        mco-pane:Payment ;
        rdfs:label               "Payment" ;
        mvco:actedBy             <http://mpeg.org/RecordLabel> ;
        mco-pane:hasAmount       9 ;
        mco-pane:hasBeneficiary  <http://mpeg.org/Publisher> ;
        mco-pane:hasCurency      "USD cents" .

<http://mpeg.org/obligation3>
        a                         mco-core:Obligation ;
        rdfs:label                "Consumer pays a fixed rate" ;
        mco-core:issuedIn         <http://mpeg.org/contract4> ;
        mvco:issuedBy             <http://mpeg.org/Consumer> ;
        mco-core:obligatesAction  <http://mpeg.org/pay1> .

<http://mpeg.org/contract4>
        a                  mco-core:Contract ;
        rdfs:label         "CONTRACT 4 - Digital sale - Big labels. For record labels that have a direct deal with record labels." ;
        mco-core:hasParty  <http://mpeg.org/RecordLabel> , <http://mpeg.org/Musicians> , <http://mpeg.org/SongWriter> , <http://mpeg.org/DigitalSale> , <http://mpeg.org/Publisher> , <http://mpeg.org/Consumer> , <http://mpeg.org/ArtistBand> .
`;
