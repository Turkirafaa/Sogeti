//Try out the seach engine
describe('Sogetis homepage', () => {
    beforeEach(() => {
        cy
            .visit('https://www.sogeti.se/')

            .get('.acceptCookie')
            .click()

    })

    it('Checks that the site search feature returns accurate results', () => {
        cy.visit('https://www.sogeti.se/')
            .get('.navbar-search > .sprite-header').click()
        cy.get('.search-text-box').type('Digital transformation')
        cy.get('.search-label').should('be.visible').click()
        cy.contains('Digital transformation').should('be.visible')
    })


    it('Search engine', () => {
        cy
            .visit('https://www.sogeti.se/')

            .get('.navbar-search > .sprite-header')
            .click()
            .get('.search-text-box').should('be.visible')
            .type('HEJ')
            .get('.search-label').should('be.visible')
            .click()
            .get('.search-hits').should('be.visible')
    })

    it('Pick Malmö Office', () => {

        cy
            .visit('https://www.sogeti.se/')
            .get('.navbar-search > .sprite-header')
            .click()
            .get('.search-text-box').should('be.visible')
            .type('Malmö')
            .get('.search-label').should('be.visible')
            .click()
            .get('#Content').contains('Malmö').click()
            .get('#right-columnspecial').contains('Patrik Nilsson').should('be.visible')

    })

    it('Checks that the "Lediga jobb" link in the footer works correctly', () => {
        cy.visit('https://www.sogeti.se/')
        cy.get('#footerPart').contains('Lediga jobb').click()
        cy.url().should('include', '/lediga-jobb')
    })

    it('navigates to different pages', () => {
        cy.visit('https://www.sogeti.se/')
        cy.get('#main-nav > ul > li > a').each((link) => {
            cy.wrap(link).click()
            cy.url().should('contain', link.attr('href'))
            cy.go('back')
        })
    })

    describe('Sogeti Homepage different device ', () => {
        const viewports = [
            { name: 'desktop', size: [1280, 800] },
            { name: 'tablet', size: [768, 1024] },
            { name: 'mobile', size: [375, 667] },
        ];


        viewports.forEach(viewport => {
            it(`should load successfully on ${viewport.name} viewport`, () => {
                cy.viewport(viewport.size[0], viewport.size[1]);
                cy.visit('https://www.sogeti.se/');
                cy.title().should('contain', 'Sogeti Sverige');
            });
        });
    });




})