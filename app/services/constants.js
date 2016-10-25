import Ember from 'ember';

export default Ember.Service.extend({
    reviewTypes:[{name:'Internal'}, {name:'External'},{name:'QMFun'}],
    courseTypes:[{name:'ATC Teaching Course (TQOC)'}, {name:'ATC Design Course (DQOC)'},{name:'Improving Your Online Course (IYOC)'}]
});
